---
tags:
- Commerce
- Subform
- CTools
- Drupal-planet
permalink: /content/commerce-product-subform/
title: Commerce product + Subform
created: 1327831820
layout: post
---
<strong>Edit: Use the <a href="http://drupal.org/project/inline_entity_form">Inline entity form</a> module that was created after this post was published.</strong>

This post will go over an example (yet fully functionally) module that shows how we can embed a commerce product form inside a node form, and have the node reference the commerce product - without horrible hacks.

<!-- more -->

<img src="/assets/images/legacy/Product-1.jpg" />

<img src="/assets/images/legacy/Create-Product-2.jpg" />

<img src="/assets/images/legacy/Product-3-Site-Install.jpg" />

<a href="https://github.com/amitaibu/commerce_product_subform">Here is the code</a>

The problem is obviously the fact that we don’t have commerce product ID nor a node ID, as none of those objects is saved. A second problem is how to actually embed the commerce product form inside the node form. <a href="http://drupal.org/project/subform">Subform</a> module solves both issues (with a little custom code help).

I won’t go over each line of code here, as the module is well documented, however I will explain the _important steps.

In the node's form alter, we embed the commerce product, using Subform’s form element.

```php
<?php
module_load_include('inc', 'commerce_product', 'includes/commerce_product.forms');
$form['commerce_product_subform'] = array(
  '#type' => 'subform',
  '#subform_id' => 'commerce_product_ui_product_form',
  '#subform_arguments' => array($commerce_product),
  '#required' => TRUE,
  '#weight' => 10,
);
?>
```

In the code above we embed the form, pass it a $product object, and say it is required - meaning Subform should do validation on the embedded form.
Next step, is adding submit handlers <strong>in the right order</strong>

```php
<?php
// Set the first submit handler to be "subform_submit_all", so the
// commerce product will be created, before handing the submitted node
// se we can associate the node to the commerce product.
// The last submit handler is the original 'node_form_submit', which
// will get all the values already populated, and save the node.
if (empty($node->nid)) {
  array_unshift($form['actions']['submit']['#submit'], 'subform_submit_all', 'commerce_product_subform_commerce_product_submit');
}
else {
  // The node already exists, so we assume there is already a reference
  // to the commerce product, so just add "subform_submit_all" submit
  // handler, to make sure the commerce product can be edited.
  array_unshift($form['actions']['submit']['#submit'], 'subform_submit_all');
}
?>
```

Noticed the emphasize on the “right order” above? That’s because we want Subform to first submit the commerce product form (thus the commerce product will be saved and have an ID), next we want our own submit handler to set the field reference from the node to the commerce product, and last we want the original ```node_form_submit()``` to save the node.

In the example module, you will notice that we also hide the commerce product title. The reason is that we can easily populate the title from the node's title (see ```commerce_product_subform_form_commerce_product_ui_validate()```).

As bonus, the example module also has a CTools plugin, that allows you to add the subform to an node add/ edit page that was overriden by Page manager.
