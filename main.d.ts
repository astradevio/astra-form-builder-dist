/**
 * Main entry point for the AstraSmartForm library
 *
 * This file serves as the primary export for library usage.
 * Other developers can import AstraFormBuilder and other components from here.
 *
 * Example usage:
 * ```typescript
 * import { AstraFormBuilder } from 'astra-smartform';
 *
 * // Multiple initialization options:
 * const formBuilder1 = new AstraFormBuilder('.form-builder');     // By class
 * const formBuilder2 = new AstraFormBuilder('#my-form');          // By ID with #
 * const formBuilder3 = new AstraFormBuilder('my-form');           // By ID without #
 * const formBuilder4 = new AstraFormBuilder(document.getElementById('my-form')); // By HTMLElement
 * ```
 */
export { AstraFormBuilder } from './AstraFormBuilder.js';
export { AstraFormBuilder as FormBuilder } from './AstraFormBuilder.js';
export { JSONExporter } from './JSONExporter.js';
export { ElementRegistry } from './ElementRegistry.js';
export { DragDropManager } from './DragDropManager.js';
export { PropertyPanel } from './PropertyPanel.js';
export { RendererFactory } from './renderers/RendererFactory.js';
export { BaseRenderer } from './renderers/BaseRenderer.js';
export { BasicRenderer } from './renderers/BasicRenderer.js';
export { BootstrapRenderer } from './renderers/BootstrapRenderer.js';
export { TailwindRenderer } from './renderers/TailwindRenderer.js';
export { PreviewRenderer } from './renderers/PreviewRenderer.js';
export type { FormFieldInstance, FormRowInstance, FormColumnInstance, FormFieldMeta, FormFieldEvents, FormData, PropertyConfig, FormElementConfig } from './types.js';
export { Utils } from './utils.js';
export { ScopedDOMManager } from './utils/ScopedDOMManager.js';
/**
 * Library version
 */
export declare const VERSION = "0.1.0";
/**
 * Library metadata
 */
export declare const LIBRARY_INFO: {
    readonly name: "AstraSmartForm";
    readonly version: "0.1.0";
    readonly description: "Professional drag-and-drop form builder with TypeScript support by Astra Dev";
    readonly author: "Astra Dev";
    readonly license: "MIT";
    readonly repository: "https://github.com/astradevio/astra-smartform";
    readonly documentation: "https://docs.astradev.io/smartform";
};
//# sourceMappingURL=main.d.ts.map