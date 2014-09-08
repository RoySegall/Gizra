---
title: How to submit an application to iTunes App Store
tags:
  - AngularJs
  - iTunes
  - iOS
  - Apple
  - iTunes App Store
permalink: "/content/how-to-submit-an-application-to-itunes-app-store"
layout: post
published: true
author: ceoaliongroo
---



Submitting an app to the iTunes App Store is, to put it mildly, not as simple as one might think.

Afters struggling with it a few times, we thought it might be useful to create a step-by-step guide - hopefully you might find it useful too.

<!-- more -->

## Requirements

* An account in a [iOS Developer](http://developer.apple.com/).
* An XCode project an test the application.
* An app configured for distribution. [Apple adiciotnal info](https://developer.apple.com/library/ios/documentation/IDEs/Conceptual/AppDistributionGuide/ConfiguringYourApp/ConfiguringYourApp.html#//apple_ref/doc/uid/TP40012582-CH28-SW1)
* The tools: [Provisioning Portal](http://developer.apple.com/ios/manage/overview/), XCode, Keychain Access utility and [iTunes Connect](http://itunesconnect.apple.com/).

## Create unique App ID

* Open the [Provisioning Portal.](http://developer.apple.com/ios/manage/overview/)
* Select Identifier

![1_provisional_site_main.jpg]({{BASE_PATH}}/assets/images/posts/how-to-submit-an-application-to-itunes-app-store/1_provisional_site_main.jpg)

* Press [+] "Add" button to create a new App ID. [add image]
* Fill the registration form:

![2_identifier_register.jpg]({{BASE_PATH}}/assets/images/posts/how-to-submit-an-application-to-itunes-app-store/2_identifier_register.jpg)

* Open the XCode project and select Target.
* Enter the Bundle Identifier.

**Note**: Bundle Identifier = App ID + App ID suffix.

example: com.gizra.publiceducation.newAppIdSuffix.

## Create a Secure Distribution Certificate

* Open Keychain Access in your mac.
* Open preferences.
* Turn off OCSP and CRL options.

![3_kaychain_access_preference.png]({{BASE_PATH}}/assets/images/posts/how-to-submit-an-application-to-itunes-app-store/3_kaychain_access_preference.png)

* Keychain Access -> Certificate Assistant -> Request a Certificate From a Certificate Authority...

![4_request_certificate.jpg]({{BASE_PATH}}/assets/images/posts/how-to-submit-an-application-to-itunes-app-store/4_request_certificate.jpg)

* Fill User Email Address with the same email information of account iOS Developer.
* Leave CA Email Address field blank.
* Select "Save to disk" and "Let me specify key pair information".

This save a request certificate file in your computer, with the extension .certSigningRequest.

## Add certificate to Provisioning Portal

* Open the [Provisioning Portal](http://developer.apple.com/ios/manage/overview/).
* Select "Certificates".
* Press "Add" button to create a new iOS Certificate.
* Select "App Store" and "Ad Hoc" in the section Production.

![5_add_new_certificate.jpg]({{BASE_PATH}}/assets/images/posts/how-to-submit-an-application-to-itunes-app-store/5_add_new_certificate.jpg)

* Press "Continue" to skip the rest of the fields, since you've already request the certificate.
* Select the request certificate file saved in your computer, e.g. CertificateSigningRequest.certSigningRequest

![6_upload_signing_request.png]({{BASE_PATH}}/assets/images/posts/how-to-submit-an-application-to-itunes-app-store/6_upload_signing_request.png)

* Select "Continue" to generate the certificate and download it.
* Double click the certificate file (*.cer) and this installs the certificate.

## (Optional) Backup Certificate

You can backup the work so far so that you won't have to repeat the process with the following steps:

* Open Keychain Access.
* File -> Export Items

![7_export_certificate.jpg]({{BASE_PATH}}/assets/images/posts/how-to-submit-an-application-to-itunes-app-store/7_export_certificate.jpg)

* Save the file (*.p12) on the disk.

## Create a Distribution Provisioning Profile

* Open the [Provisioning Portal.](http://developer.apple.com/ios/manage/overview/)
* Select Provision Profiles.
* Press "Add" button to create a new Provisioning Profile.
* Select "App Store" in the section Production.

![8_provisioning_profile_form.png]({{BASE_PATH}}/assets/images/posts/how-to-submit-an-application-to-itunes-app-store/8_provisioning_profile_form.png)

* Select App ID.

![9_provisioning_profile_app_id.jpg]({{BASE_PATH}}/assets/images/posts/how-to-submit-an-application-to-itunes-app-store/9_provisioning_profile_app_id.jpg)

* Select Certificate (iOS Distribution).

![10_provisioning_profile_certificate.jpg]({{BASE_PATH}}/assets/images/posts/how-to-submit-an-application-to-itunes-app-store/10_provisioning_profile_certificate.jpg)

* Enter a name for your profile and generate.
* Download and double click to install the Provisioning Profile.

## Check Code Signing & Build Settings

_Configuration Project:_
* Open XCode and select project and select tab "Build Settings".
* Select in the search filter "All" and "Combined".
* Look for "Deployment" -> "Skip install" and select "Yes".

![11_project_skip%20installation.jpg]({{BASE_PATH}}/assets/images/posts/how-to-submit-an-application-to-itunes-app-store/11_project_skip%20installation.jpg)


_Configuration Target - General:_
* Select the target and tab "General".
* Verify you have defined a valid "Bundle Identifier": this have to be the App ID defined in the "Create unique App ID" step. **(must include the App ID Suffix)** example: com.gizra.publiceducation.1
* Select Team.

![12_project_select_team.jpg]({{BASE_PATH}}/assets/images/posts/how-to-submit-an-application-to-itunes-app-store/12_project_select_team.jpg)

**Note**: Select the account used to create the certificate.

_Configuration Target - General - App Icons:_
* In Source select "Don't use asset catalogs".

![13_donot_asset_catalogs.png]({{BASE_PATH}}/assets/images/posts/how-to-submit-an-application-to-itunes-app-store/13_donot_asset_catalogs.png)

* Create a new assets catalog.

![14_new_assets_catalog.png]({{BASE_PATH}}/assets/images/posts/how-to-submit-an-application-to-itunes-app-store/14_new_assets_catalog.png)

* Press the arrow and Drag and Drop the icons of your application.
* Select the new catalog in source.

![15_target_select_new_appicon.png]({{BASE_PATH}}/assets/images/posts/how-to-submit-an-application-to-itunes-app-store/15_target_select_new_appicon.png)

_Configuration Target - Build Settings:_
* Select target and tab "Build Settings".
* Look for "Code Signing" -> "Code Signing Identify" -> "Release" -> "Any iOS SDK" and select the Certificate you generated (which must be associated to the Provisioning Profile)

![16_target_code_signing.jpg]({{BASE_PATH}}/assets/images/posts/how-to-submit-an-application-to-itunes-app-store/16_target_code_signing.jpg)

* Look for "Code Signing" -> "Provisioning Profile" and select the Provisioning Profile you've generated.

![17_target_build_settings_provisioning_profile.jpg]({{BASE_PATH}}/assets/images/posts/how-to-submit-an-application-to-itunes-app-store/17_target_build_settings_provisioning_profile.jpg)

* Look for "Deployment" -> "Skip install" and select "No".

![18_target_build_settings_skip_install.jpg]({{BASE_PATH}}/assets/images/posts/how-to-submit-an-application-to-itunes-app-store/18_target_build_settings_skip_install.jpg)

## Create an App in iTunes Connect
* Open the [iTunes Connect](http://itunesconnect.apple.com/) site.
* Select "Manage Your Application"

![19_iTunes_Connect_home.jpg]({{BASE_PATH}}/assets/images/posts/how-to-submit-an-application-to-itunes-app-store/19_iTunes_Connect_home.jpg)

* Select "Add new App"
* Complete the information of the application.

**Note** You must select the **_Bundle ID with the App ID Suffix_** created in "Create unique App ID" step.

![20_new%20app%20itunes.jpg]({{BASE_PATH}}/assets/images/posts/how-to-submit-an-application-to-itunes-app-store/20_new%20app%20itunes.jpg)

## Build and Archive the Application
* Select in the menu "Product" -> "Scheme" -> "Edit Scheme".

![21_edit_scheme.jpg]({{BASE_PATH}}/assets/images/posts/how-to-submit-an-application-to-itunes-app-store/21_edit_scheme.jpg)

* Select "Archive".
* Select "Build Configuration" to "Release" and press OK button.

![22_scheme_archive_configuration.png]({{BASE_PATH}}/assets/images/posts/how-to-submit-an-application-to-itunes-app-store/22_scheme_archive_configuration.png)

* Build the application selecting in the menu "Product" -> "Archive".

![23_build_and_archive_app.png]({{BASE_PATH}}/assets/images/posts/how-to-submit-an-application-to-itunes-app-store/23_build_and_archive_app.png)

**Note** This step archives the application and opens the "Organizer" tool of XCode.

## Validate and Submit the application
* Select the application archive in the "Organizer" of XCode.
* Press "Validate...".
* Select the credentials generated for the application.
* Once validation is complete, the application can be submitted - press the "Distribute..." button..
* You can now check the submission status [iTunes Connect](http://itunesconnect.apple.com/).

## Woohoo!!
You should good to go now. Wasn't that fun?

If you're still having issues, unfortunately you'll have to turn to Apple's [own documentation](https://developer.apple.com/library/ios/documentation/IDEs/Conceptual/AppDistributionGuide/Troubleshooting/Troubleshooting.html#//apple_ref/doc/uid/TP40012582-CH5-SW2). Enjoy :)
