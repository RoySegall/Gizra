---
tags:
- Drupal-planet
- Migrate
permalink: /content/data-migration-part-2/
title: Data Migration - part 2
created: 1295877669
layout: post
---
This is the 2nd part of the tutorial. You can see the 1st part <a href="/content/data-migration-part-1">here</a>.

Now that we have imported the users using  the basic tools of migration module. We will learn to import references (nid or uid) and files.

Install the  <a href ="http://drupal.org/project/migrate_extras" >migrate extras</a> module .
Migrate extra module enables import of file field.

The following  example demonstrate how to import the old cars table.

<!-- more -->

Here is the table structures of old cars , 'cars':
<img src="/assets/images/legacy/blog2_tab1.jpg" alt=""/>

Here is Drupal’s car content type fields structure (The machine name  is: car).
<img src="/assets/images/legacy/blog2_tab2.jpg" alt=""/>


Create a new extended class to import the cars :

```php
<?php
class OldCarsMigration extends Migration {
  public function __construct() {
    parent::__construct();
    $this->description = t('Migrate cars from the source database');
?>
```

Now we ll set the cars table primary key,  see <a href=”/content/data-migration-part-1”>Migrate Part 1 for more information </a>:

```php
<?php
$this->map = new MigrateSQLMap($this->machineName,
  array('car_id'  => array(
    'type' => 'int',
    'not null' => TRUE,
    ),
  ),
  MigrateDestinationTerm::getKeySchema(),
);
?>
```
Here we set the query to get the source object:

```php
<?php
$query = db_select('old_users', 'users')
  ->fields('users' ,array(
    'car_id' ,
    'user_id' ,
    'car_model',
    'picture',
    'failures',
  ));
$this->source = new MigrateSourceSQL($query);
?>
```

It’s important to define migration dependencies to avoid the possibility that cars will be imported before users, In such a case the system won’t know how to handle the user reference field since those user were not imported yet.

```php
<?php
  $this->dependencies = array('OldUsersMigration');
?>
```
Now we will use the primary key mapping that was defined in <a href=”/content/data-migration-part-1”>Migrate Part 1</a> to keep the same references defined in the old database. After that Migrate module will take care of figuring out what is the new UID corresponding to the old UID.

```php
<?php
  // We want to reference the fields to the old user ID.
  $this->addFieldMapping('uid', 'user_id') //uid(destination), user_id(source)
    ->sourceMigration('OldUsersMigration')// the name of the class in part 1
    ->defaultValue(1);
?>
```

Define your destination as car content type.

```php
<?php
  $this->destination = new MigrateDestinationNode('car');
?>
```
Map all the other fields.

```php
<?php
  $this->addFieldMapping('field_car_model', 'car_model');
?>
```

Now, lets see how to import serialized string values :

In the old database we have a field that saves a multiple value list of failures, the values are saved  using a single (serialized) string field and semicolon (;)  as seperator between each value, for example if a car has the following failures: p1 and p2, the value of the string will be p1;p2.
Therefore this field cannot be imported as is, we need to explode the values before importing them, this is done using the ->separator property as shown bellow:

```php
<?php
  $this->addFieldMapping('field_failures', 'failures')
    ->separator(';')
?>
```

In Drupal the structure is (standard CCK multilple field):

```
field_failures :
	[0]['value'] = p1
	[1]['value'] = p2
	[2]['value'] = p3
```

Now we will import the image files, thanks to Migrate module all we need to do is the following :

```php
<?php
  $arguments = MigrateFileFieldHandler::arguments('<the path to the old image>', 'file_copy', FILE_EXISTS_RENAME);
  // Mapping of old field (picture) to new CCK field (field_image)
  $this->addFieldMapping('field_image', 'picture')
    ->arguments($arguments);
?>
```

This will take care of copying the files to Drupal /files directory as well as the creation of file objects.


Map the DNM (Do not map) fields.

```php
<?php
  $this->addFieldMapping('nid')
    ->issueGroup(t('DNM'));
?>
```

An other very useful function in the <i>prepare</i> function, the function allows us to manipulate the mapping result just before the node save function, a bit like a hook.
In this example I use this function to convert a string value to lower case.

The function signature is:
```
 public function prepare(stdClass $account, stdClass $row)
```


$node argument represent the destination node, just before it’s saved into the database.
$row argument represent the source object returned by your query, it can be used as reference to make changes to your node.

```php
<?php
  public function prepare(stdClass $account, stdClass $row) {
    $account->field_car_model[0]['value'] =  strtolower($account->field_car_model[0]['value']) ;
  }
?>
```

Here is an other example where I used the $row argument to modify the node.
```php
<?php
  $account->field_car_model[0]['value'] = strtolower($row->field_car_model) ;
?>
```
