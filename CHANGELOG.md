## Changelog

## 8.0.0

- **BREAKING** Upgraded to Angular 20 LTS with full compatibility (Minimum peer dependency remains Angular 19.0.0+).
- Update to TypeScript 5.9.x for improved type safety and performance.
- Modernized dependency injection using `inject()` function throughout codebase.
- All demo components fully migrated to standalone architecture.
- Updated build tooling to Angular 20 ecosystem.
- Code quality improvements and cleanup.

## 7.0.0

- **BREAKING** Support Angular 19+ dropping support for Angular 18 and below (Minimum peer dependency is now Angular 19.0.0).
- **BREAKING** Component is now standalone. `AngularSignaturePadModule` it has been removed. Import `SignaturePadComponent` directly instead.
- Upgrade `signature_pad` to the latest version (5.1.2) See ([Changelog](https://github.com/szimek/signature_pad/blob/master/CHANGELOG.md#512-2025-11-16))
- Update to TypeScript 5.8.x for better type safety and performance.
- Demo app is updated to Angular 19's new standalone components.

## 6.0.1

- Possible fix for #12
- Update dependencies with minor and patch updates
- Fix the demo project for responsiveness

## 6.0.0

- **BREAKING** `redrawCanvas()` does not auto-clear data anymore; clear will be called internally, but still preserving data. You can return to the previous behavior by calling `clear()` after `redrawCanvas()` if you want it.
- **BREAKING** `clear()` will call `redrawCanvas()` first. If you just want to clear data without redrawing, then call `clear(false)`. This behavior is to fix issues where the pad loses the style after clearing data.
- **BREAKING** `clear()` will trigger `drawEnd` with the value of `null`, this can help with knowing when the pad got cleared.
- Adding new `changeBackgroundColor(color: string)` function to change the background color dynamically.
- New Demo UI and fixing broken showcase.
- Upgrade `signature_pad` to the latest version (5.0.4) See ([Changelog](https://github.com/szimek/signature_pad/blob/master/CHANGELOG.md#504-2024-10-17))
- Support Angular 18 (Now it supports Angular >= 16; if any issues occur in the future, please report).
- Update dependencies for the project

## 5.0.1

- Upgrade `signature_pad` to the latest version (4.0.7) See ([Changelog](https://github.com/szimek/signature_pad/blob/master/CHANGELOG.md#407-2022-07-21))
- Support Angular 14 (Now it is supporting Angular >= 12, if any issues happen in the future, please report).
- Drop support from Angular 10 & 11 as they are no more active nor LTS ([Support policy and schedule](https://angular.io/guide/releases#support-policy-and-schedule))

## 4.0.1

- Upgrade `signature_pad` to the final version 4.0.0 See ([Changelog](https://github.com/szimek/signature_pad/blob/master/CHANGELOG.md#400))
- Support Angular 13.
