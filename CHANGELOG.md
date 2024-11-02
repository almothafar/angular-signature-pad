## Changelog

## 6.0.0

- **BREAKING** `redrawCanvas()` do not auto clear data anymore, clear will be called still but preserving data, you can return to the previous behaviour by calling `clear()` after `redrawCanvas()` if you really want it.
- **BREAKING** `clear()` will call `redrawCanvas()` first, if you just want to clear data without redraw call `clear(false)`, this behaviour is to fix issues where the pad losses the style after clearing data.
- **BREAKING** `clear()` will trigger `drawEnd` with value of `null`, this can help with knowing when the pad got cleared.
- Adding new `changeBackgroundColor(color: string)` function to change the background color dynamically.
- New Demo UI and fixing broken showcase.
- Upgrade `signature_pad` to the latest version (5.0.4) See ([Changelog](https://github.com/szimek/signature_pad/blob/master/CHANGELOG.md#504-2024-10-17))
- Support Angular 18 (Now it is supporting Angular >= 16, if any issues happened in the future, please report).
- Update dependencies for the project

## 5.0.1

- Upgrade `signature_pad` to the latest version (4.0.7) See ([Changelog](https://github.com/szimek/signature_pad/blob/master/CHANGELOG.md#407-2022-07-21))
- Support Angular 14 (Now it is supporting Angular >= 12, if any issues happened in the future, please report).
- Drop support from Angular 10 & 11 as they are no more active nor LTS ([Support policy and schedule](https://angular.io/guide/releases#support-policy-and-schedule))

## 4.0.1

- Upgrade `signature_pad` to the final version 4.0.0 See ([Changelog](https://github.com/szimek/signature_pad/blob/master/CHANGELOG.md#400))
- Support Angular 13.
