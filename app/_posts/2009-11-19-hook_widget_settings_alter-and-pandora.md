---
tags:
- Drupal-planet
permalink: /content/hookwidgetsettingsalter-and-pandora/
title: hook_widget_settings_alter() and Pandora
created: 1258635803
layout: post
---
As <a href="http://drupal.org/user/39593">markus_petrux</a> wrote:
<blockquote>
It seems that the new addition to CCK, the new hook_widget_settings_alter() opened Pandora's box.
</blockquote>

There are quite a few modules that attach their own logic to CCK fields. Up until now those modules had to have their own DB or set their own variables.

In CCK 2.5, ```hook_widget_settings_alter()``` got in, which allows your module to hook into the field settings, and rely on CCK to save and load those settings when needed.

But that's not all - as the settings are becoming part of the CCK field defention it means that when you'll export the CCK to code - your module settings will be there. Your module now actually has import/ export functionality without you even having to bother about.

<!-- more -->

All you need is to pack your CCK code export in <a href="http://drupal.org/project/features">Features</a>.
Here's an example that will add some data to number fields:

```php
<?php
/**
 * Implementation of hook_widget_settings_alter().
 */
function foo_widget_settings_alter(&$settings, $op, $widget) {
  $widget_types = array('number');
  if ((!empty($widget['type']) && in_array($widget['type'], $widget_types)) || (!empty($widget['widget_type']) && in_array($widget['widget_type'], $widget_types))) {
    switch ($op) {
      case 'form':
        $settings['foo'] = array(
          '#type' => 'checkbox',
          '#title' => t('Some settings'),
          '#options' => array(0 => t('Disabled'), 1 => t('Enabled')),
          '#default_value' => !empty($widget['foo']),
        );

        break;
      case 'save':
        $settings[] = 'foo';
        break;
    }
  }
}

/**
 * Check if 'foo' is enabled on a field.
 */
function foo_is_field_foo($field_name) {
  $field = content_fields($field_name);
  return !empty($field['widget']['foo']);
}
?>
```