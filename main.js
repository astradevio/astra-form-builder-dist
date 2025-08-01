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
// Core exports
export { AstraFormBuilder } from './AstraFormBuilder.js';
// Backward compatibility alias
export { AstraFormBuilder as FormBuilder } from './AstraFormBuilder.js';
export { JSONExporter } from './JSONExporter.js';
export { ElementRegistry } from './ElementRegistry.js';
export { DragDropManager } from './DragDropManager.js';
export { PropertyPanel } from './PropertyPanel.js';
// Renderer exports
export { RendererFactory } from './renderers/RendererFactory.js';
export { BaseRenderer } from './renderers/BaseRenderer.js';
export { BasicRenderer } from './renderers/BasicRenderer.js';
export { BootstrapRenderer } from './renderers/BootstrapRenderer.js';
export { TailwindRenderer } from './renderers/TailwindRenderer.js';
export { PreviewRenderer } from './renderers/PreviewRenderer.js';
// Utility exports
export { Utils } from './utils.js';
export { ScopedDOMManager } from './utils/ScopedDOMManager.js';
/**
 * Library version
 */
export const VERSION = '0.1.0';
/**
 * Library metadata
 */
export const LIBRARY_INFO = {
    name: 'AstraSmartForm',
    version: VERSION,
    description: 'Professional drag-and-drop form builder with TypeScript support by Astra Dev',
    author: 'Astra Dev',
    license: 'MIT',
    repository: 'https://github.com/astradevio/astra-smartform',
    documentation: 'https://docs.astradev.io/smartform'
};
//# sourceMappingURL=main.js.map