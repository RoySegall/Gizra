---
tags:
- Migrate
- Drupal-planet
permalink: /content/data-migration-part-1/
title: Data Migration - part 1
created: 1294317693
layout: post
---
Moving an old site to Drupal?

The following article will discuss the right way to do this using the module <a href ="http://drupal.org/project/migrate"> Migrate (version2)</a>.
Migrate V2 uses <a href ="http://drupal.org/project/drush">Drush</a> (Drupal Shell)  to execute the migration functions, if your are not familiar with Drush I suggest looking into this very powerful tool.

Here is a list of the main challenges I have faced during the process :

<ol>
	<li> Mapping old information to the new structure.</li>
	<li> Mapping the old values to match the new fields.</li>
	<li> Moving the references between the old objects into Drupal.</li>
</ol>

<!-- more -->

Install the following modules :
<ol>
<li> <a href ="http://drupal.org/project/drush">drush</a></li>
<li> <a href ="http://drupal.org/project/migrate">Migration 6.x</a> </li>
<li> activate Migrate ,Migrate UI</li>
</ol>

```
drush dl migrate
drush en migrate migrate_ui
```

In this example we will import Users from the old site , take a look at the old Users table:

car_users:

<img src="/assets/images/legacy/blog1_tab1_0.jpg" alt=""/>

For the migrate module to recognize classes defined by your module, you must define hook_migrate_api() in your .module file:
```php
<?php
function example_migrate_api() {
  $api = array(
	'api' => 2,
  );
  return $api;
}
?>
```

Define the migration class, each migration class should end with the suffix Migration .

```php
<?php
class OldUsersMigration extends Migration

  public function __construct() {
    parent::__construct();
    $this->description = t('Migrate users from the source database');
?>
```

define the source (the old data object) :

This part is used in order to map the primary key of the old USERS table. We ll also use this mapping when we want to import objects that were references to users (in our case , users).
This mean that Migrate will take care of coordinating the old UID to the new one.

```php
<?php
  $this->map = new MigrateSQLMap($this->machineName,
    array(
      'user_id'  => array(
        'type' => 'int',
        'not null' => TRUE,
      ),
    ),
    MigrateDestinationTerm::getKeySchema()
  );
?>
```

Now, we want to set a query to bring our source records (from the old DB), we use the db_select function as described bellow:
```php
<?php
   $query = db_select('car_users', 'old_users')
     ->fields('old_users' ,array(
      'email' ,
      'user_id' ,
      'password',
      'date_of_birth' ,
      'last_login_date' ,
      'username',
    ));
  $this->source = new MigrateSourceSQL($query);
?>
```

Define the destination , for example : user , taxonomy , node.

```php
<?php
  $this->destination = new MigrateDestinationUser(); // Drupal user
?>
```
Its time to start the field mapping , here we will map all the fileds that we want to import from the old DB to the new field name in drupal for example :

password : the old site password field.
pass: the Drupal password field.

```php
<?php
  $this->addFieldMapping('pass', 'password');
  $this->addFieldMapping('mail', 'email');
  $this->addFieldMapping('name', 'username');
  $this->addFieldMapping('login', 'last_login_date');
  $this->addFieldMapping('created', 'date_added');
  $this->addFieldMapping('signature', 'moto');
  $this->addFieldMapping('access', 'last_login_date');
?>
```

In order to complete the mapping process, we need to mark all the destination fields that are NOT mapped as DNM (do not map)  :

```php
<?php
    //all the fields we don’t wanna map in the destination!!!
    $this->addFieldMapping('init')
      ->issueGroup(t('DNM'));
    $this->addFieldMapping('picture')
      ->issueGroup(t('DNM'));
    $this->addFieldMapping('language')
      ->issueGroup(t('DNM'));
    $this->addFieldMapping('timezone')
      ->issueGroup(t('DNM'));
    $this->addFieldMapping('signature_format')
      ->issueGroup(t('DNM'));
    $this->addFieldMapping('theme')
      ->issueGroup(t('DNM'));
    $this->addFieldMapping('roles')
      ->issueGroup(t('DNM'));
    $this->addFieldMapping('status')
      ->issueGroup(t('DNM'));
?>
```

Druring the mapping you can use the 'migrate ui' to see your migration map status:

open the page /basepath/admin/content/migrate

<img src="/assets/images/legacy/blog1_tab2_0.png" alt=""/>

Now we can executing the migration using  Drush, the excute functions allows us a process of trial and error using the command, <i>drush migrate-import</i> and <i>drush migrate-rollback</i> repeadly.

To import the first 10 users :

```
drush mi oldUsers –-itemlimit=10
```

To roll back to the previous state :

```
drush mr oldUsers –-itemlimit=10
```

To see your data migration status use:

```
drush ms oldUsers
```

In the next chapter we will discuss importing cars of the users with an emphasis on the transfer relationships between tables, files, etc. ..
