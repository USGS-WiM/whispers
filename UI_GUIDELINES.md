# UI Guidelines

## Button styles

Using the Material Design component documentation as a guide, use only [outlined and contained buttons](https://material.io/components/buttons#usage). These buttons styles are outlined which helps to make it obvious to the user that they are clickable buttons. The contained button (also called high emphasis) should only be used for one button in a given view to distinguish the primary action (for example, in a search form, the **Search** button would be styled as a contained button).

Also in keeping with Material Design, all button text labels should be uppercase.

The accent color should be used for all buttons. However red can be used for actions that are destructive and irreversible, such as buttons that result in deleting database records.

### Outlined buttons

Also known as medium emphasis.

Code sample:

```html
<button mat-stroked-button color="accent" (click)="onClick()">
  <mat-icon class="material-icons">clear_all</mat-icon> Clear Selection
</button>
```

### Contained buttons

Also known as high emphasis. Only use this style for the one main button in a view.

Code sample:

```html
<button mat-raised-button color="primary" (click)="doSearch()">
  <mat-icon class="material-icons">search</mat-icon> Search
</button>
```

## Icons

### When to use icons

Don't use an icon for utility buttons, for example **cancel** or **close** buttons that merely dismiss a dialog.

### Standard icons

- for adding an item
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/></svg>
  ```html
  <mat-icon class="material-icons">add_circle</mat-icon>
  ```
- for deleting an item
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11H7v-2h10v2z"/></svg>
  ```html
  <mat-icon class="material-icons">remove_circle</mat-icon>
  ```
- for editing an item
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
  ```html
  <mat-icon class="material-icons">edit</mat-icon>
  ```
- for submitting a form
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
  ```html
  <mat-icon class="material-icons">send</mat-icon>
  ```

## User notifications

User notifications come in two flavors: **toast (or snackbar) notifications** and **modal dialogs**. Toast notifications should be used only when the user doesn't need to take any action based on the message. If the user needs to take some sort of action, then a modal dialog is more appropriate. For example, if the user resets their password and they need to check their email for a reset link, that would be appropriate for a modal dialog since a user might not see or read in time a toast notification. An example of a good use of a toast notification is when the user's form submission is successfully saved.

### Require confirmation before irreversible actions

Use a modal dialog to have the user confirm any irreversible action such as a delete of a record that the user won't be able to undo.

## Date formats

- For data entry: MM/DD/YYYY
  - example: 01/12/2021
  - This is the default format for the Angular Material Datepicker
- For display: Month short name DD, YYYY
  - example: Jan 12, 2021
  - in Angular, this is the "mediumDate" format (https://angular.io/api/common/DatePipe#pre-defined-format-options)
    ```html
    <span>{{ aDate | date:'mediumDate' }}</span>
    ```
- When displayed in table columns, a more abbreviated format is allowed, MM/DD/YY
  - example: 01/12/21
  - in Angular this is the "shortDate" format
    ```html
    <span>{{ aDate | date:'shortDate' }}</span>
    ```

## Color palette

| Element                                      | Color                                                                                                                                                                                                     |
| -------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| HOME                                         |                                                                                                                                                                                                           |
| - WHISPers Banner                            | <div style="background-color: #050921; color: white">#050921</div>                                                                                                                                        |
| - Navigation Menu                            | <div style="background-color: #182042; color: white">#182042</div>                                                                                                                                        |
| MAP                                          |                                                                                                                                                                                                           |
| (new animal type symbology)                  |                                                                                                                                                                                                           |
| - mammal                                     | <div style="background-color: #fc3c4f; color: white">#fc3c4f</div>                                                                                                                                        |
| - bird                                       | <div style="background-color: #fcdc76; color: white">#fcdc76</div>                                                                                                                                        |
| - reptile/amphibian                          | <div style="background-color: #25b9aa; color: white">#25b9aa</div>                                                                                                                                        |
| - fish                                       | <div style="background-color: #85e4fa; color: white">#85e4fa</div>                                                                                                                                        |
| - other                                      | <div style="background-color: #a06ff9; color: white">#a06ff9</div>                                                                                                                                        |
| - multiple types                             | <div style="background-color: #a7a9b2; color: white">#a7a9b2</div>                                                                                                                                        |
| (old diagnosis type based symbology) symbols |                                                                                                                                                                                                           |
| - bacteria                                   | <div style="background-color: #25b9aa; color:white">#25b9aa</div>                                                                                                                                         |
| - fungus                                     | <div style="background-color: #3092f4; color:white">#3092f4</div>                                                                                                                                         |
| - nut/met/dev                                | <div style="background-color: #fc3c4f; color:white">#fc3c4f</div>                                                                                                                                         |
| - other                                      | <div style="background-color: #fb833c; color:white">#fb833c</div>                                                                                                                                         |
| - parasite                                   | <div style="background-color: #6fcdc7; color:white">#6fcdc76</div>                                                                                                                                        |
| - toxin                                      | <div style="background-color: #a06ff9; color:white">#a06ff9</div>                                                                                                                                         |
| - trauma                                     | <div style="background-color: #ffb3ff; color:white">#ffb3ff</div>                                                                                                                                         |
| - virus                                      | <div style="background-color: #85e4fa; color:white">#85e4fa</div>                                                                                                                                         |
| Multiple Events                              | <div style="background-color: #a7a9b2; color:white">#a7a9b2</div>                                                                                                                                         |
| flyways (outline, background)                |                                                                                                                                                                                                           |
| atlantic                                     | <div style="background-color: #28995b; color:white">#28995b</div>, <div style="background-color: #c6ddd0; color: white">#c6ddd0</div>                                                                     |
| central                                      | <div style="background-color: #b43cc7; color:white">#b43cc7</div>, <div style="background-color: #e2cae6; color: white">#e2cae6</div>                                                                     |
| mississippi                                  | <div style="background-color: #eb5834; color:white">#eb5834</div>, <div style="background-color: #edd0c8; color: white">#edd0c8</div>                                                                     |
| pacific                                      | <div style="background-color: #ffbd4f; color:white">#ffbd4f</div>, <div style="background-color: #f1e4ce; color: white">#f1e4ce</div>                                                                     |
| HUCs                                         | <div style="background-color: #b57dcf; color:white">#b57dcf</div>                                                                                                                                         |
| EVENT DETAILS MAP                            |                                                                                                                                                                                                           |
| county poly                                  | <div style="background-color: #00f; color:white">#00f</div>, <div style="background-color: #9ca8ba; color: white">#9ca8ba</div>                                                                           |
| flyways                                      | same as main map                                                                                                                                                                                          |
| HUCs                                         | same as main map                                                                                                                                                                                          |
| GLOBALS                                      |                                                                                                                                                                                                           |
| background color                             | <div style="background-color: #ffffff; color:black; border:1px solid black">#ffffff</div>                                                                                                                 |
| text                                         | <div style="background-color: #313b57; color:white">#313b57</div>                                                                                                                                         |
| buttons                                      |                                                                                                                                                                                                           |
| - blue                                       | <div style="background-color: #304ffe; color:white">#304ffe</div>                                                                                                                                         |
| - white                                      | <div style="background-color: #ffffff; color:black; border:1px solid black">#ffffff</div>                                                                                                                 |
| table header row                             | <div style="background-color: #eeeef8; color:black; border:1px solid black">#eeeef8</div>                                                                                                                 |
| table rows                                   | <div style="background-color: #e8f5e9; color:black; border:1px solid black">#e8f5e9</div>, <div style="background-color: #f7f7ff; color:black; border:1px solid black">#f7f7ff</div> (alternating colors) |

## Button Alignment

- Dialogs
  - for dialogs the bottom buttons should be right aligned, with the main button right most
- Forms
  - in general one needs to look at how the form will be scanned by the user. If the form is left aligned and a single column (labels above input fields), then a left aligned submit button at the end of the form is most appropriate.
