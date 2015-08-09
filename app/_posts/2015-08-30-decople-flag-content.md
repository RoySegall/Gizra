---
title: Decoupled flag - grant a like to content via restful
tags:
  - restful
  - flag
  - headless drupal
permalink: "/content/decouple-flag-content"
layout: post
published: true
author: RoySegall
---
We've started to understand that going fully decouple can be painful. Very painful.
All the good things we have are now gone. Disappear. Vanished into the void where
no bits can be sent. Maybe i’m a little bit extreme since it’s still exists in
the backend Drupal.

One of the things, which might sound very minor, it's the functionality of the
flag module. One of the many usages the flag module have it's the like button.
Just like on Facebook. But how can we achieve it with a decouple site? Let’s see!

<!-- more -->
## Setting up the infrastructure

First, you’ll need to patch flag with [this patch](https://www.drupal.org/node/2461515).
This will provide the support between entity metadata wrapper, Flag and
eventually Restful.

The other thing we need to do is to set up the end point.

## `flag__1_0.inc`:
```php
<?php
$plugin = array(
 'label' => t('Like'),
 'description' => t('Like a specific entity.'),
 'resource' => 'like',
 'class' => 'DrupalHubFlagLike',
 'name' => 'flag__1_0',
 'entity_type' => 'flagging',
 'bundle' => 'like',
 'hook_menu' => TRUE,
 'authentication_types' => TRUE,
 'authentication_optional' => TRUE,
);

```
## DrupalHubFlagLike.class.php:

```php
<?php

class DrupalHubFlagLike extends \RestfulEntityBase {

  /**
   * {@inheritdoc}
   */
  public function publicFieldsInfo() {
    $public_fields = parent::publicFieldsInfo();

    $public_fields['entity_type'] = array(
      'property' => 'entity_type',
    );

    $public_fields['entity_id'] = array(
      'property' => 'entity_id',
    );

    $public_fields['uid'] = array(
      'property' => 'uid',
    );

    return $public_fields;
  }

  /**
   * Sort the query for list.
   *
   * @param \EntityFieldQuery $query
   *   The query object.
   *
   * @throws \RestfulBadRequestException
   *
   * @see \RestfulEntityBase::getQueryForList
   */
  protected function queryForListSort(\EntityFieldQuery $query) {
    $query->propertyOrderBy('fid', 'ASC');
  }

  /**
   * {@inheritdoc}
   */
  protected function queryForListFilter(\EntityFieldQuery $query) {

    $request = $this->getRequest();

    if (isset($request['check_flagged'])) {

      // Check if the user already flagged the current entity.
      if (empty($request['entity']) || empty($request['id'])) {
        throw new RestfulBadRequestException('You did not provide entity type or ID.');
      }

      // We need to check if the user already flagged this an entity.
      $query
        ->propertyCondition('uid', $this->getUserId())
        ->propertyCondition('entity_type', $request['entity'])
        ->propertyCondition('entity_id', $request['id']);
    }

    parent::queryForListFilter($query);
  }

  /**
   * Set the bundle of the flag as the flag name.
   */
  public function entityPreSave(\EntityMetadataWrapper $wrapper) {
    $wrapper->name->set($this->getBundle());
    $wrapper->uid->set($this->getUserId());
  }

  /**
   * Validating for a single flag.
   */
  public function entityValidate(\EntityMetadataWrapper $wrapper) {
    $request = $this->getRequest();

    $query = new EntityFieldQuery();
    $results = $query
      ->entityCondition('entity_type', 'flagging')
      ->propertyCondition('entity_type', $request['entity_type'])
      ->propertyCondition('entity_id', $request['entity_id'])
      ->propertyCondition('uid', $this->getUserId())
      ->count()
      ->execute();

    if ($results > 0) {
      throw new \RestfulBadRequestException('The user already flagged this entity.');
    }

    parent::entityValidate($wrapper);
  }

  /**
   * {@inheritdoc}
   */
  public function deleteEntity($entity_id) {

    $flag = flag_get_flag($this->getBundle());
    $flag->flag('unflag', $entity_id, $this->getAccount());

    // Set the HTTP headers.
    $this->setHttpHeaders('Status', 204);
  }

  /**
   * Get the user ID from the request or the authentication manager.
   *
   * @return integer
   *   The user ID.
   */
  private function getUserId() {
    $request = $this->getRequest();
    return empty($request['uid']) ? $this->getAccount()->uid : $request['uid'];
  }

}

```

##The angular directive
After the backend is set up, let’s set up the front end.

Getting the directive using bower is very easy:

```js
bower install drupal-restful-flag --save
```

If not, go the github [project page](https://github.com/DrupalHub/flag-directive)
and clone it. On the way you can see how to set it up.

Adding the directive won't take a lot of effort:

```html
<span flag type="like" likes="20" entity="node" id="1"></span>
```
When likes is the current likes number, entity is the entity type and the id is
the identifier for the entity the user currently watching - Node, Comment... Any
thing the flag is attached to.

That’s it.
