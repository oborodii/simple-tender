import { MissingTranslationHandler, MissingTranslationHandlerParams } from '@ngx-translate/core';

// handler for @ngx-translate
export class MissingTranslationService implements MissingTranslationHandler {
  handle(params: MissingTranslationHandlerParams): string {
    return `WARN: '${params.key}' is missing in '${params.translateService.currentLang}' locale`;
  }
}
