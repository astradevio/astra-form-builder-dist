(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.AstraFormBuilder = {}));
})(this, (function (exports) { 'use strict';

    class EventEmitter {
        constructor() {
            this.events = new Map();
        }
        on(event, callback) {
            if (!this.events.has(event)) {
                this.events.set(event, []);
            }
            this.events.get(event).push(callback);
        }
        emit(event, data) {
            const callbacks = this.events.get(event);
            if (callbacks) {
                callbacks.forEach(callback => callback(data));
            }
        }
        off(event, callback) {
            if (!callback) {
                this.events.delete(event);
                return;
            }
            const callbacks = this.events.get(event);
            if (callbacks) {
                const index = callbacks.indexOf(callback);
                if (index > -1) {
                    callbacks.splice(index, 1);
                }
            }
        }
        removeAllListeners() {
            this.events.clear();
        }
    }

    /**
     * Registry for managing available form elements
     */
    class ElementRegistry {
        constructor() {
            this.elements = new Map();
            this.initializeDefaultElements();
        }
        /**
         * Get standard meta configuration for form controls
         */
        getStandardMeta(customMeta = {}) {
            return { ...ElementRegistry.STANDARD_META, ...customMeta };
        }
        /**
         * Get standard events configuration for form controls
         */
        getStandardEvents(customEvents = {}) {
            return { ...ElementRegistry.STANDARD_EVENTS, ...customEvents };
        }
        /**
         * Get standard Alpine.js configuration for form controls
         */
        getStandardAlpine(customAlpine = {}) {
            return { ...ElementRegistry.STANDARD_ALPINE, ...customAlpine };
        }
        /**
         * Initialize default form elements
         */
        initializeDefaultElements() {
            // Layout Elements
            this.register({
                id: 'row',
                htmlTag: 'row',
                label: 'Row',
                icon: '📐',
                category: 'layout',
                properties: {
                    id: {
                        type: 'text',
                        label: 'ID',
                        defaultValue: '',
                        required: true
                    },
                    columns: {
                        type: 'select',
                        label: 'Number of Columns',
                        defaultValue: 1,
                        options: [
                            { label: '1 Column', value: 1 },
                            { label: '2 Columns', value: 2 },
                            { label: '3 Columns', value: 3 },
                            { label: '4 Columns', value: 4 }
                        ]
                    }
                }
            });
            this.register({
                id: 'column',
                htmlTag: 'column',
                label: 'Column',
                icon: '📏',
                category: 'layout',
                properties: {
                    id: {
                        type: 'text',
                        label: 'ID',
                        defaultValue: '',
                        required: true
                    },
                    width: {
                        type: 'select',
                        label: 'Width',
                        defaultValue: 12,
                        options: [
                            { label: '1/12', value: 1 },
                            { label: '2/12', value: 2 },
                            { label: '3/12', value: 3 },
                            { label: '4/12', value: 4 },
                            { label: '6/12', value: 6 },
                            { label: '8/12', value: 8 },
                            { label: '9/12', value: 9 },
                            { label: '12/12', value: 12 }
                        ]
                    }
                }
            });
            // Form Element (Special - Container)
            this.register({
                id: 'form',
                htmlTag: 'form',
                label: 'Form',
                icon: '📋',
                category: 'layout',
                properties: {
                    id: {
                        type: 'text',
                        label: 'Form ID',
                        defaultValue: 'form',
                        required: true
                    },
                    name: {
                        type: 'text',
                        label: 'Form Name',
                        defaultValue: '',
                        required: true
                    },
                    action: {
                        type: 'text',
                        label: 'Action URL',
                        defaultValue: ''
                    },
                    method: {
                        type: 'select',
                        label: 'Method',
                        defaultValue: 'post',
                        options: [
                            { label: 'POST', value: 'post' },
                            { label: 'GET', value: 'get' }
                        ]
                    },
                    enctype: {
                        type: 'select',
                        label: 'Encoding Type',
                        defaultValue: 'application/x-www-form-urlencoded',
                        options: [
                            { label: 'URL Encoded', value: 'application/x-www-form-urlencoded' },
                            { label: 'Multipart Form Data', value: 'multipart/form-data' },
                            { label: 'Plain Text', value: 'text/plain' }
                        ]
                    },
                    target: {
                        type: 'select',
                        label: 'Target',
                        defaultValue: '_self',
                        options: [
                            { label: 'Same Window', value: '_self' },
                            { label: 'New Window', value: '_blank' },
                            { label: 'Parent Frame', value: '_parent' },
                            { label: 'Top Frame', value: '_top' }
                        ]
                    },
                    autocomplete: {
                        type: 'select',
                        label: 'Autocomplete',
                        defaultValue: 'on',
                        options: [
                            { label: 'On', value: 'on' },
                            { label: 'Off', value: 'off' }
                        ]
                    },
                    novalidate: {
                        type: 'boolean',
                        label: 'No Validation',
                        defaultValue: false
                    },
                    class: {
                        type: 'text',
                        label: 'CSS Classes',
                        defaultValue: ''
                    }
                },
                meta: {},
                events: {
                    onSubmit: {
                        type: 'event',
                        label: 'On Submit',
                        defaultValue: { action: 'submitForm', target: 'vanilla', parameters: {} }
                    },
                    onReset: {
                        type: 'event',
                        label: 'On Reset',
                        defaultValue: { action: 'resetForm', target: 'vanilla', parameters: {} }
                    }
                },
                alpine: {}
            });
            // Text Input
            this.register({
                id: 'input-text',
                htmlTag: 'input',
                label: 'Text Input',
                icon: '📝',
                category: 'form',
                properties: {
                    type: {
                        type: 'fixed',
                        label: 'Type',
                        defaultValue: 'text'
                    },
                    id: {
                        type: 'text',
                        label: 'ID',
                        defaultValue: '',
                        required: true
                    },
                    name: {
                        type: 'text',
                        label: 'Name',
                        defaultValue: '',
                        required: true
                    },
                    placeholder: {
                        type: 'text',
                        label: 'Placeholder',
                        defaultValue: ''
                    },
                    required: {
                        type: 'boolean',
                        label: 'Required',
                        defaultValue: false
                    },
                    maxLength: {
                        type: 'number',
                        label: 'Max Characters',
                        defaultValue: 100
                    }
                },
                meta: this.getStandardMeta({
                    label: {
                        type: 'text',
                        label: 'Label',
                        defaultValue: 'Text Field'
                    }
                }),
                events: this.getStandardEvents(),
                alpine: this.getStandardAlpine()
            });
            // Email Input
            this.register({
                id: 'input-email',
                htmlTag: 'input',
                label: 'Email',
                icon: '📧',
                category: 'form',
                properties: {
                    type: {
                        type: 'fixed',
                        label: 'Type',
                        defaultValue: 'email'
                    },
                    id: {
                        type: 'text',
                        label: 'ID',
                        defaultValue: '',
                        required: true
                    },
                    name: {
                        type: 'text',
                        label: 'Name',
                        defaultValue: '',
                        required: true
                    },
                    placeholder: {
                        type: 'text',
                        label: 'Placeholder',
                        defaultValue: 'your@email.com'
                    },
                    required: {
                        type: 'boolean',
                        label: 'Required',
                        defaultValue: true
                    }
                },
                meta: this.getStandardMeta({
                    label: {
                        type: 'text',
                        label: 'Label',
                        defaultValue: 'Email'
                    },
                    icon: {
                        type: 'text',
                        label: 'Icon',
                        defaultValue: '📧'
                    }
                }),
                events: this.getStandardEvents(),
                alpine: this.getStandardAlpine()
            });
            // Textarea
            this.register({
                id: 'textarea',
                htmlTag: 'textarea',
                label: 'Long Text',
                icon: '📄',
                category: 'form',
                properties: {
                    id: {
                        type: 'text',
                        label: 'ID',
                        defaultValue: '',
                        required: true
                    },
                    name: {
                        type: 'text',
                        label: 'Name',
                        defaultValue: '',
                        required: true
                    },
                    placeholder: {
                        type: 'text',
                        label: 'Placeholder',
                        defaultValue: ''
                    },
                    rows: {
                        type: 'number',
                        label: 'Rows',
                        defaultValue: 4
                    },
                    required: {
                        type: 'boolean',
                        label: 'Required',
                        defaultValue: false
                    },
                    class: {
                        type: 'text',
                        label: 'CSS Class',
                        defaultValue: ''
                    },
                    style: {
                        type: 'text',
                        label: 'Inline Style',
                        defaultValue: ''
                    }
                },
                meta: this.getStandardMeta({
                    label: {
                        type: 'text',
                        label: 'Label',
                        defaultValue: 'Long Text'
                    },
                    icon: {
                        type: 'text',
                        label: 'Icon',
                        defaultValue: '📄'
                    }
                }),
                events: this.getStandardEvents(),
                alpine: this.getStandardAlpine()
            });
            // Select
            this.register({
                id: 'select',
                htmlTag: 'select',
                label: 'Select',
                icon: '📋',
                category: 'form',
                properties: {
                    id: {
                        type: 'text',
                        label: 'ID',
                        defaultValue: '',
                        required: true
                    },
                    name: {
                        type: 'text',
                        label: 'Name',
                        defaultValue: '',
                        required: true
                    },
                    options: {
                        type: 'textarea',
                        label: 'Options (one per line)',
                        defaultValue: 'Option 1\nOption 2\nOption 3',
                        description: 'Enter one option per line'
                    },
                    required: {
                        type: 'boolean',
                        label: 'Required',
                        defaultValue: false
                    },
                    class: {
                        type: 'text',
                        label: 'CSS Class',
                        defaultValue: ''
                    },
                    style: {
                        type: 'text',
                        label: 'Inline Style',
                        defaultValue: ''
                    }
                },
                meta: this.getStandardMeta({
                    label: {
                        type: 'text',
                        label: 'Label',
                        defaultValue: 'Select an option'
                    },
                    icon: {
                        type: 'text',
                        label: 'Icon',
                        defaultValue: '📋'
                    }
                }),
                events: this.getStandardEvents(),
                alpine: this.getStandardAlpine()
            });
            // Number Input
            this.register({
                id: 'input-number',
                htmlTag: 'input',
                label: 'Number',
                icon: '🔢',
                category: 'form',
                properties: {
                    type: {
                        type: 'fixed',
                        label: 'Type',
                        defaultValue: 'number'
                    },
                    id: {
                        type: 'text',
                        label: 'ID',
                        defaultValue: '',
                        required: true
                    },
                    name: {
                        type: 'text',
                        label: 'Name',
                        defaultValue: '',
                        required: true
                    },
                    placeholder: {
                        type: 'text',
                        label: 'Placeholder',
                        defaultValue: ''
                    },
                    min: {
                        type: 'number',
                        label: 'Min Value',
                        defaultValue: 0
                    },
                    max: {
                        type: 'number',
                        label: 'Max Value',
                        defaultValue: 100
                    },
                    required: {
                        type: 'boolean',
                        label: 'Required',
                        defaultValue: false
                    }
                },
                meta: this.getStandardMeta({
                    label: {
                        type: 'text',
                        label: 'Label',
                        defaultValue: 'Number'
                    },
                    icon: {
                        type: 'text',
                        label: 'Icon',
                        defaultValue: '🔢'
                    }
                }),
                events: this.getStandardEvents(),
                alpine: this.getStandardAlpine()
            });
            // Checkbox
            this.register({
                id: 'checkbox',
                htmlTag: 'checkbox',
                label: 'Checkbox',
                icon: '☑️',
                category: 'form',
                properties: {
                    id: {
                        type: 'text',
                        label: 'ID',
                        defaultValue: '',
                        required: true
                    },
                    name: {
                        type: 'text',
                        label: 'Name',
                        defaultValue: '',
                        required: true
                    },
                    value: {
                        type: 'text',
                        label: 'Value',
                        defaultValue: '1'
                    },
                    checked: {
                        type: 'boolean',
                        label: 'Checked by default',
                        defaultValue: false
                    },
                    required: {
                        type: 'boolean',
                        label: 'Required',
                        defaultValue: false
                    },
                    class: {
                        type: 'text',
                        label: 'CSS Class',
                        defaultValue: ''
                    },
                    style: {
                        type: 'text',
                        label: 'Inline Style',
                        defaultValue: ''
                    }
                },
                meta: this.getStandardMeta({
                    label: {
                        type: 'text',
                        label: 'Label',
                        defaultValue: 'Check this option'
                    },
                    icon: {
                        type: 'text',
                        label: 'Icon',
                        defaultValue: '☑️'
                    }
                }),
                events: this.getStandardEvents(),
                alpine: this.getStandardAlpine()
            });
            // Password Input
            this.register({
                id: 'input-password',
                htmlTag: 'input',
                label: 'Password',
                icon: '🔒',
                category: 'form',
                properties: {
                    type: {
                        type: 'fixed',
                        label: 'Type',
                        defaultValue: 'password'
                    },
                    id: {
                        type: 'text',
                        label: 'ID',
                        defaultValue: '',
                        required: true
                    },
                    name: {
                        type: 'text',
                        label: 'Name',
                        defaultValue: '',
                        required: true
                    },
                    placeholder: {
                        type: 'text',
                        label: 'Placeholder',
                        defaultValue: ''
                    },
                    required: {
                        type: 'boolean',
                        label: 'Required',
                        defaultValue: false
                    },
                    minLength: {
                        type: 'number',
                        label: 'Min Length',
                        defaultValue: 0
                    },
                    maxLength: {
                        type: 'number',
                        label: 'Max Length',
                        defaultValue: 100
                    },
                    autocomplete: {
                        type: 'select',
                        label: 'Autocomplete',
                        defaultValue: 'current-password',
                        options: [
                            { label: 'Current Password', value: 'current-password' },
                            { label: 'New Password', value: 'new-password' },
                            { label: 'Off', value: 'off' }
                        ]
                    }
                },
                meta: this.getStandardMeta({
                    label: {
                        type: 'text',
                        label: 'Label',
                        defaultValue: 'Password'
                    },
                    icon: {
                        type: 'text',
                        label: 'Icon',
                        defaultValue: '🔒'
                    }
                }),
                events: this.getStandardEvents(),
                alpine: this.getStandardAlpine()
            });
            this.register({
                id: 'input-radio',
                htmlTag: 'input',
                label: 'Radio Button',
                icon: '🔘',
                category: 'form',
                properties: {
                    type: {
                        type: 'fixed',
                        label: 'Type',
                        defaultValue: 'radio'
                    },
                    id: {
                        type: 'text',
                        label: 'ID',
                        defaultValue: '',
                        required: true
                    },
                    name: {
                        type: 'text',
                        label: 'Name',
                        defaultValue: '',
                        required: true
                    },
                    value: { type: 'text', label: 'Value', defaultValue: '' }
                },
                meta: this.getStandardMeta({
                    icon: {
                        type: 'text',
                        label: 'Icon',
                        defaultValue: '🔘'
                    }
                }),
                events: this.getStandardEvents(),
                alpine: this.getStandardAlpine()
            });
            this.register({
                id: 'button',
                htmlTag: 'button',
                label: 'Button',
                icon: '🔲',
                category: 'form',
                properties: {
                    id: {
                        type: 'text',
                        label: 'ID',
                        defaultValue: '',
                        required: true
                    },
                    name: {
                        type: 'text',
                        label: 'Name',
                        defaultValue: '',
                        required: true
                    },
                    type: { type: 'select', label: 'Type', defaultValue: 'button', options: [
                            { label: 'Button', value: 'button' },
                            { label: 'Submit', value: 'submit' },
                            { label: 'Reset', value: 'reset' }
                        ] },
                    class: {
                        type: 'text',
                        label: 'CSS Class',
                        defaultValue: ''
                    },
                    style: {
                        type: 'text',
                        label: 'Inline Style',
                        defaultValue: ''
                    }
                },
                meta: this.getStandardMeta({
                    icon: {
                        type: 'text',
                        label: 'Icon',
                        defaultValue: '🔲'
                    }
                }),
                events: this.getStandardEvents({
                    onClick: {
                        type: 'event',
                        label: 'On Click (click)',
                        defaultValue: { action: 'submit', target: 'vanilla', parameters: {} }
                    }
                }),
                alpine: this.getStandardAlpine()
            });
            this.register({
                id: 'input-submit',
                htmlTag: 'input',
                label: 'Submit Button',
                icon: '🔲',
                category: 'form',
                properties: {
                    type: {
                        type: 'fixed',
                        label: 'Type',
                        defaultValue: 'submit'
                    },
                    id: {
                        type: 'text',
                        label: 'ID',
                        defaultValue: '',
                        required: true
                    },
                    name: {
                        type: 'text',
                        label: 'Name',
                        defaultValue: '',
                        required: true
                    },
                    class: {
                        type: 'text',
                        label: 'CSS Class',
                        defaultValue: ''
                    },
                    style: {
                        type: 'text',
                        label: 'Inline Style',
                        defaultValue: ''
                    }
                },
                meta: this.getStandardMeta({
                    icon: {
                        type: 'text',
                        label: 'Icon',
                        defaultValue: '🔲'
                    }
                }),
                events: this.getStandardEvents({
                    onClick: {
                        type: 'event',
                        label: 'On Click (click)',
                        defaultValue: { action: 'submit', target: 'vanilla', parameters: {} }
                    }
                }),
                alpine: this.getStandardAlpine()
            });
            this.register({
                id: 'input-reset',
                htmlTag: 'input',
                label: 'Reset Button',
                icon: '🔲',
                category: 'form',
                properties: {
                    type: {
                        type: 'fixed',
                        label: 'Type',
                        defaultValue: 'reset'
                    },
                    id: {
                        type: 'text',
                        label: 'ID',
                        defaultValue: '',
                        required: true
                    },
                    name: {
                        type: 'text',
                        label: 'Name',
                        defaultValue: '',
                        required: true
                    },
                    class: {
                        type: 'text',
                        label: 'CSS Class',
                        defaultValue: ''
                    },
                    style: {
                        type: 'text',
                        label: 'Inline Style',
                        defaultValue: ''
                    }
                },
                meta: this.getStandardMeta({
                    icon: {
                        type: 'text',
                        label: 'Icon',
                        defaultValue: '🔲'
                    }
                }),
                events: this.getStandardEvents({
                    onClick: {
                        type: 'event',
                        label: 'On Click (click)',
                        defaultValue: { action: 'submit', target: 'vanilla', parameters: {} }
                    }
                }),
                alpine: this.getStandardAlpine()
            });
            // URL Input
            this.register({
                id: 'input-url',
                htmlTag: 'input',
                label: 'URL',
                icon: '🌐',
                category: 'form',
                properties: {
                    type: {
                        type: 'fixed',
                        label: 'Type',
                        defaultValue: 'url'
                    },
                    id: {
                        type: 'text',
                        label: 'ID',
                        defaultValue: '',
                        required: true
                    },
                    name: {
                        type: 'text',
                        label: 'Name',
                        defaultValue: '',
                        required: true
                    },
                    placeholder: {
                        type: 'text',
                        label: 'Placeholder',
                        defaultValue: 'https://example.com'
                    },
                    required: {
                        type: 'boolean',
                        label: 'Required',
                        defaultValue: false
                    }
                },
                meta: this.getStandardMeta({
                    label: {
                        type: 'text',
                        label: 'Label',
                        defaultValue: 'Website URL'
                    },
                    icon: {
                        type: 'text',
                        label: 'Icon',
                        defaultValue: '🌐'
                    }
                }),
                events: this.getStandardEvents(),
                alpine: this.getStandardAlpine()
            });
            // Telephone Input
            this.register({
                id: 'input-tel',
                htmlTag: 'input',
                label: 'Telephone',
                icon: '📞',
                category: 'form',
                properties: {
                    type: {
                        type: 'fixed',
                        label: 'Type',
                        defaultValue: 'tel'
                    },
                    id: {
                        type: 'text',
                        label: 'ID',
                        defaultValue: '',
                        required: true
                    },
                    name: {
                        type: 'text',
                        label: 'Name',
                        defaultValue: '',
                        required: true
                    },
                    placeholder: {
                        type: 'text',
                        label: 'Placeholder',
                        defaultValue: '+1 (555) 123-4567'
                    },
                    pattern: {
                        type: 'text',
                        label: 'Pattern (Regex)',
                        defaultValue: ''
                    },
                    required: {
                        type: 'boolean',
                        label: 'Required',
                        defaultValue: false
                    },
                    class: {
                        type: 'text',
                        label: 'CSS Class',
                        defaultValue: ''
                    },
                    style: {
                        type: 'text',
                        label: 'Inline Style',
                        defaultValue: ''
                    }
                },
                meta: this.getStandardMeta({
                    label: {
                        type: 'text',
                        label: 'Label',
                        defaultValue: 'Phone Number'
                    },
                    icon: {
                        type: 'text',
                        label: 'Icon',
                        defaultValue: '📞'
                    }
                }),
                events: this.getStandardEvents(),
                alpine: this.getStandardAlpine()
            });
            // Search Input
            this.register({
                id: 'input-search',
                htmlTag: 'input',
                label: 'Search',
                icon: '🔍',
                category: 'form',
                properties: {
                    type: {
                        type: 'fixed',
                        label: 'Type',
                        defaultValue: 'search'
                    },
                    id: {
                        type: 'text',
                        label: 'ID',
                        defaultValue: '',
                        required: true
                    },
                    name: {
                        type: 'text',
                        label: 'Name',
                        defaultValue: '',
                        required: true
                    },
                    placeholder: {
                        type: 'text',
                        label: 'Placeholder',
                        defaultValue: 'Search...'
                    },
                    required: {
                        type: 'boolean',
                        label: 'Required',
                        defaultValue: false
                    }
                },
                meta: this.getStandardMeta({
                    label: {
                        type: 'text',
                        label: 'Label',
                        defaultValue: 'Search'
                    },
                    icon: {
                        type: 'text',
                        label: 'Icon',
                        defaultValue: '🔍'
                    }
                }),
                events: this.getStandardEvents(),
                alpine: this.getStandardAlpine()
            });
            // Date Input
            this.register({
                id: 'input-date',
                htmlTag: 'input',
                label: 'Date',
                icon: '📅',
                category: 'form',
                properties: {
                    type: {
                        type: 'fixed',
                        label: 'Type',
                        defaultValue: 'date'
                    },
                    id: {
                        type: 'text',
                        label: 'ID',
                        defaultValue: '',
                        required: true
                    },
                    name: {
                        type: 'text',
                        label: 'Name',
                        defaultValue: '',
                        required: true
                    },
                    min: {
                        type: 'text',
                        label: 'Min Date',
                        defaultValue: ''
                    },
                    max: {
                        type: 'text',
                        label: 'Max Date',
                        defaultValue: ''
                    },
                    required: {
                        type: 'boolean',
                        label: 'Required',
                        defaultValue: false
                    }
                },
                meta: this.getStandardMeta({
                    label: {
                        type: 'text',
                        label: 'Label',
                        defaultValue: 'Date'
                    },
                    icon: {
                        type: 'text',
                        label: 'Icon',
                        defaultValue: '📅'
                    }
                }),
                events: this.getStandardEvents(),
                alpine: this.getStandardAlpine()
            });
            // Time Input
            this.register({
                id: 'input-time',
                htmlTag: 'input',
                label: 'Time',
                icon: '🕐',
                category: 'form',
                properties: {
                    type: {
                        type: 'fixed',
                        label: 'Type',
                        defaultValue: 'time'
                    },
                    id: {
                        type: 'text',
                        label: 'ID',
                        defaultValue: '',
                        required: true
                    },
                    name: {
                        type: 'text',
                        label: 'Name',
                        defaultValue: '',
                        required: true
                    },
                    min: {
                        type: 'text',
                        label: 'Min Time',
                        defaultValue: ''
                    },
                    max: {
                        type: 'text',
                        label: 'Max Time',
                        defaultValue: ''
                    },
                    step: {
                        type: 'number',
                        label: 'Step (seconds)',
                        defaultValue: 60
                    },
                    required: {
                        type: 'boolean',
                        label: 'Required',
                        defaultValue: false
                    }
                },
                meta: this.getStandardMeta({
                    label: {
                        type: 'text',
                        label: 'Label',
                        defaultValue: 'Time'
                    },
                    icon: {
                        type: 'text',
                        label: 'Icon',
                        defaultValue: '🕐'
                    }
                }),
                events: this.getStandardEvents(),
                alpine: this.getStandardAlpine()
            });
            // DateTime-Local Input
            this.register({
                id: 'input-datetime-local',
                htmlTag: 'input',
                label: 'Date & Time',
                icon: '📅🕐',
                category: 'form',
                properties: {
                    type: {
                        type: 'fixed',
                        label: 'Type',
                        defaultValue: 'datetime-local'
                    },
                    id: {
                        type: 'text',
                        label: 'ID',
                        defaultValue: '',
                        required: true
                    },
                    name: {
                        type: 'text',
                        label: 'Name',
                        defaultValue: '',
                        required: true
                    },
                    min: {
                        type: 'text',
                        label: 'Min DateTime',
                        defaultValue: ''
                    },
                    max: {
                        type: 'text',
                        label: 'Max DateTime',
                        defaultValue: ''
                    },
                    required: {
                        type: 'boolean',
                        label: 'Required',
                        defaultValue: false
                    }
                },
                meta: this.getStandardMeta({
                    label: {
                        type: 'text',
                        label: 'Label',
                        defaultValue: 'Date & Time'
                    },
                    icon: {
                        type: 'text',
                        label: 'Icon',
                        defaultValue: '📅🕐'
                    }
                }),
                events: this.getStandardEvents(),
                alpine: this.getStandardAlpine()
            });
            // Month Input
            this.register({
                id: 'input-month',
                htmlTag: 'input',
                label: 'Month',
                icon: '📆',
                category: 'form',
                properties: {
                    type: {
                        type: 'fixed',
                        label: 'Type',
                        defaultValue: 'month'
                    },
                    id: {
                        type: 'text',
                        label: 'ID',
                        defaultValue: '',
                        required: true
                    },
                    name: {
                        type: 'text',
                        label: 'Name',
                        defaultValue: '',
                        required: true
                    },
                    min: {
                        type: 'text',
                        label: 'Min Month',
                        defaultValue: ''
                    },
                    max: {
                        type: 'text',
                        label: 'Max Month',
                        defaultValue: ''
                    },
                    required: {
                        type: 'boolean',
                        label: 'Required',
                        defaultValue: false
                    }
                },
                meta: this.getStandardMeta({
                    label: {
                        type: 'text',
                        label: 'Label',
                        defaultValue: 'Month'
                    },
                    icon: {
                        type: 'text',
                        label: 'Icon',
                        defaultValue: '📆'
                    }
                }),
                events: this.getStandardEvents(),
                alpine: this.getStandardAlpine()
            });
            // Week Input
            this.register({
                id: 'input-week',
                htmlTag: 'input',
                label: 'Week',
                icon: '🗓️',
                category: 'form',
                properties: {
                    type: {
                        type: 'fixed',
                        label: 'Type',
                        defaultValue: 'week'
                    },
                    id: {
                        type: 'text',
                        label: 'ID',
                        defaultValue: '',
                        required: true
                    },
                    name: {
                        type: 'text',
                        label: 'Name',
                        defaultValue: '',
                        required: true
                    },
                    min: {
                        type: 'text',
                        label: 'Min Week',
                        defaultValue: ''
                    },
                    max: {
                        type: 'text',
                        label: 'Max Week',
                        defaultValue: ''
                    },
                    required: {
                        type: 'boolean',
                        label: 'Required',
                        defaultValue: false
                    }
                },
                meta: this.getStandardMeta({
                    label: {
                        type: 'text',
                        label: 'Label',
                        defaultValue: 'Week'
                    },
                    icon: {
                        type: 'text',
                        label: 'Icon',
                        defaultValue: '🗓️'
                    }
                }),
                events: this.getStandardEvents(),
                alpine: this.getStandardAlpine()
            });
            // Color Input
            this.register({
                id: 'input-color',
                htmlTag: 'input',
                label: 'Color Picker',
                icon: '🎨',
                category: 'form',
                properties: {
                    type: {
                        type: 'fixed',
                        label: 'Type',
                        defaultValue: 'color'
                    },
                    id: {
                        type: 'text',
                        label: 'ID',
                        defaultValue: '',
                        required: true
                    },
                    name: {
                        type: 'text',
                        label: 'Name',
                        defaultValue: '',
                        required: true
                    },
                    value: {
                        type: 'text',
                        label: 'Default Color',
                        defaultValue: '#000000'
                    }
                },
                meta: this.getStandardMeta({
                    label: {
                        type: 'text',
                        label: 'Label',
                        defaultValue: 'Choose Color'
                    },
                    icon: {
                        type: 'text',
                        label: 'Icon',
                        defaultValue: '🎨'
                    }
                }),
                events: this.getStandardEvents(),
                alpine: this.getStandardAlpine()
            });
            // Range Input
            this.register({
                id: 'input-range',
                htmlTag: 'input',
                label: 'Range Slider',
                icon: '🎚️',
                category: 'form',
                properties: {
                    type: {
                        type: 'fixed',
                        label: 'Type',
                        defaultValue: 'range'
                    },
                    id: {
                        type: 'text',
                        label: 'ID',
                        defaultValue: '',
                        required: true
                    },
                    name: {
                        type: 'text',
                        label: 'Name',
                        defaultValue: '',
                        required: true
                    },
                    min: {
                        type: 'number',
                        label: 'Min Value',
                        defaultValue: 0
                    },
                    max: {
                        type: 'number',
                        label: 'Max Value',
                        defaultValue: 100
                    },
                    step: {
                        type: 'number',
                        label: 'Step',
                        defaultValue: 1
                    },
                    value: {
                        type: 'number',
                        label: 'Default Value',
                        defaultValue: 50
                    }
                },
                meta: this.getStandardMeta({
                    label: {
                        type: 'text',
                        label: 'Label',
                        defaultValue: 'Range'
                    },
                    icon: {
                        type: 'text',
                        label: 'Icon',
                        defaultValue: '🎚️'
                    }
                }),
                events: this.getStandardEvents(),
                alpine: this.getStandardAlpine()
            });
            // File Input
            this.register({
                id: 'input-file',
                htmlTag: 'input',
                label: 'File Upload',
                icon: '📁',
                category: 'form',
                properties: {
                    type: {
                        type: 'fixed',
                        label: 'Type',
                        defaultValue: 'file'
                    },
                    id: {
                        type: 'text',
                        label: 'ID',
                        defaultValue: '',
                        required: true
                    },
                    name: {
                        type: 'text',
                        label: 'Name',
                        defaultValue: '',
                        required: true
                    },
                    accept: {
                        type: 'text',
                        label: 'Accept File Types',
                        defaultValue: '',
                        description: 'e.g., .jpg,.png,.pdf or image/*'
                    },
                    multiple: {
                        type: 'boolean',
                        label: 'Multiple Files',
                        defaultValue: false
                    },
                    required: {
                        type: 'boolean',
                        label: 'Required',
                        defaultValue: false
                    }
                },
                meta: this.getStandardMeta({
                    label: {
                        type: 'text',
                        label: 'Label',
                        defaultValue: 'Upload File'
                    },
                    icon: {
                        type: 'text',
                        label: 'Icon',
                        defaultValue: '📁'
                    }
                }),
                events: this.getStandardEvents(),
                alpine: this.getStandardAlpine()
            });
            // Hidden Input
            this.register({
                id: 'input-hidden',
                htmlTag: 'input',
                label: 'Hidden Field',
                icon: '🙈',
                category: 'form',
                properties: {
                    type: {
                        type: 'fixed',
                        label: 'Type',
                        defaultValue: 'hidden'
                    },
                    id: {
                        type: 'text',
                        label: 'ID',
                        defaultValue: '',
                        required: true
                    },
                    name: {
                        type: 'text',
                        label: 'Name',
                        defaultValue: '',
                        required: true
                    },
                    value: {
                        type: 'text',
                        label: 'Value',
                        defaultValue: ''
                    }
                },
                meta: this.getStandardMeta({
                    label: {
                        type: 'text',
                        label: 'Label',
                        defaultValue: 'Hidden Field'
                    },
                    icon: {
                        type: 'text',
                        label: 'Icon',
                        defaultValue: '🙈'
                    }
                }),
                events: this.getStandardEvents(),
                alpine: this.getStandardAlpine()
            });
            // Fieldset
            this.register({
                id: 'fieldset',
                htmlTag: 'fieldset',
                label: 'Fieldset',
                icon: '🗂️',
                category: 'form',
                properties: {
                    id: {
                        type: 'text',
                        label: 'ID',
                        defaultValue: '',
                        required: true
                    },
                    disabled: {
                        type: 'boolean',
                        label: 'Disabled',
                        defaultValue: false
                    }
                },
                meta: this.getStandardMeta({
                    label: {
                        type: 'text',
                        label: 'Legend',
                        defaultValue: 'Group'
                    },
                    icon: {
                        type: 'text',
                        label: 'Icon',
                        defaultValue: '🗂️'
                    }
                }),
                events: this.getStandardEvents(),
                alpine: this.getStandardAlpine()
            });
            // Legend
            this.register({
                id: 'legend',
                htmlTag: 'legend',
                label: 'Legend',
                icon: '📋',
                category: 'form',
                properties: {
                    id: {
                        type: 'text',
                        label: 'ID',
                        defaultValue: '',
                        required: true
                    }
                },
                meta: this.getStandardMeta({
                    label: {
                        type: 'text',
                        label: 'Text',
                        defaultValue: 'Legend Text'
                    },
                    icon: {
                        type: 'text',
                        label: 'Icon',
                        defaultValue: '📋'
                    }
                }),
                events: this.getStandardEvents(),
                alpine: this.getStandardAlpine()
            });
            // Label
            this.register({
                id: 'label',
                htmlTag: 'label',
                label: 'Label',
                icon: '🏷️',
                category: 'form',
                properties: {
                    id: {
                        type: 'text',
                        label: 'ID',
                        defaultValue: '',
                        required: true
                    },
                    for: {
                        type: 'text',
                        label: 'For (Target Input ID)',
                        defaultValue: ''
                    }
                },
                meta: this.getStandardMeta({
                    label: {
                        type: 'text',
                        label: 'Text',
                        defaultValue: 'Label Text'
                    },
                    icon: {
                        type: 'text',
                        label: 'Icon',
                        defaultValue: '🏷️'
                    }
                }),
                events: this.getStandardEvents(),
                alpine: this.getStandardAlpine()
            });
            // Datalist
            this.register({
                id: 'datalist',
                htmlTag: 'datalist',
                label: 'Datalist',
                icon: '📝📋',
                category: 'form',
                properties: {
                    id: {
                        type: 'text',
                        label: 'ID',
                        defaultValue: '',
                        required: true
                    },
                    options: {
                        type: 'textarea',
                        label: 'Options (one per line)',
                        defaultValue: 'Option 1\nOption 2\nOption 3',
                        description: 'Enter one option per line'
                    }
                },
                meta: this.getStandardMeta({
                    label: {
                        type: 'text',
                        label: 'Label',
                        defaultValue: 'Suggestions'
                    },
                    icon: {
                        type: 'text',
                        label: 'Icon',
                        defaultValue: '📝📋'
                    }
                }),
                events: this.getStandardEvents(),
                alpine: this.getStandardAlpine()
            });
            // Output
            this.register({
                id: 'output',
                htmlTag: 'output',
                label: 'Output',
                icon: '📤',
                category: 'form',
                properties: {
                    id: {
                        type: 'text',
                        label: 'ID',
                        defaultValue: '',
                        required: true
                    },
                    name: {
                        type: 'text',
                        label: 'Name',
                        defaultValue: '',
                        required: true
                    },
                    for: {
                        type: 'text',
                        label: 'For (Related Input IDs)',
                        defaultValue: '',
                        description: 'Space-separated list of related input IDs'
                    }
                },
                meta: this.getStandardMeta({
                    label: {
                        type: 'text',
                        label: 'Label',
                        defaultValue: 'Result'
                    },
                    icon: {
                        type: 'text',
                        label: 'Icon',
                        defaultValue: '📤'
                    }
                }),
                events: this.getStandardEvents(),
                alpine: this.getStandardAlpine()
            });
            // Progress
            this.register({
                id: 'progress',
                htmlTag: 'progress',
                label: 'Progress Bar',
                icon: '📊',
                category: 'form',
                properties: {
                    id: {
                        type: 'text',
                        label: 'ID',
                        defaultValue: '',
                        required: true
                    },
                    value: {
                        type: 'number',
                        label: 'Value',
                        defaultValue: 50
                    },
                    max: {
                        type: 'number',
                        label: 'Max Value',
                        defaultValue: 100
                    }
                },
                meta: this.getStandardMeta({
                    label: {
                        type: 'text',
                        label: 'Label',
                        defaultValue: 'Progress'
                    },
                    icon: {
                        type: 'text',
                        label: 'Icon',
                        defaultValue: '📊'
                    }
                }),
                events: this.getStandardEvents(),
                alpine: this.getStandardAlpine()
            });
            // Meter
            this.register({
                id: 'meter',
                htmlTag: 'meter',
                label: 'Meter',
                icon: '📏📊',
                category: 'form',
                properties: {
                    id: {
                        type: 'text',
                        label: 'ID',
                        defaultValue: '',
                        required: true
                    },
                    value: {
                        type: 'number',
                        label: 'Value',
                        defaultValue: 6
                    },
                    min: {
                        type: 'number',
                        label: 'Min Value',
                        defaultValue: 0
                    },
                    max: {
                        type: 'number',
                        label: 'Max Value',
                        defaultValue: 10
                    },
                    low: {
                        type: 'number',
                        label: 'Low Threshold',
                        defaultValue: 3
                    },
                    high: {
                        type: 'number',
                        label: 'High Threshold',
                        defaultValue: 8
                    },
                    optimum: {
                        type: 'number',
                        label: 'Optimum Value',
                        defaultValue: 9
                    }
                },
                meta: this.getStandardMeta({
                    label: {
                        type: 'text',
                        label: 'Label',
                        defaultValue: 'Meter'
                    },
                    icon: {
                        type: 'text',
                        label: 'Icon',
                        defaultValue: '📏📊'
                    }
                }),
                events: this.getStandardEvents(),
                alpine: this.getStandardAlpine()
            });
            // Heading 1
            this.register({
                id: 'h1',
                htmlTag: 'h1',
                label: 'Heading 1',
                icon: '📰',
                category: 'content',
                properties: {
                    id: {
                        type: 'text',
                        label: 'ID',
                        defaultValue: '',
                        required: true
                    },
                    class: {
                        type: 'text',
                        label: 'CSS Class',
                        defaultValue: ''
                    },
                    style: {
                        type: 'text',
                        label: 'Inline Style',
                        defaultValue: ''
                    }
                },
                meta: {
                    innerHTML: {
                        type: 'textarea',
                        label: 'Content',
                        defaultValue: 'Main Heading'
                    }
                },
                events: {},
                alpine: {}
            });
            // Heading 2
            this.register({
                id: 'h2',
                htmlTag: 'h2',
                label: 'Heading 2',
                icon: '📄',
                category: 'content',
                properties: {
                    id: {
                        type: 'text',
                        label: 'ID',
                        defaultValue: '',
                        required: true
                    },
                    class: {
                        type: 'text',
                        label: 'CSS Class',
                        defaultValue: ''
                    },
                    style: {
                        type: 'text',
                        label: 'Inline Style',
                        defaultValue: ''
                    }
                },
                meta: {
                    innerHTML: {
                        type: 'textarea',
                        label: 'Content',
                        defaultValue: 'Section Heading'
                    }
                },
                events: {},
                alpine: {}
            });
            // Heading 3
            this.register({
                id: 'h3',
                htmlTag: 'h3',
                label: 'Heading 3',
                icon: '📃',
                category: 'content',
                properties: {
                    id: {
                        type: 'text',
                        label: 'ID',
                        defaultValue: '',
                        required: true
                    },
                    class: {
                        type: 'text',
                        label: 'CSS Class',
                        defaultValue: ''
                    },
                    style: {
                        type: 'text',
                        label: 'Inline Style',
                        defaultValue: ''
                    }
                },
                meta: {
                    innerHTML: {
                        type: 'textarea',
                        label: 'Content',
                        defaultValue: 'Subsection Heading'
                    }
                },
                events: {},
                alpine: {}
            });
            // Heading 4
            this.register({
                id: 'h4',
                htmlTag: 'h4',
                label: 'Heading 4',
                icon: '📝',
                category: 'content',
                properties: {
                    id: {
                        type: 'text',
                        label: 'ID',
                        defaultValue: '',
                        required: true
                    },
                    class: {
                        type: 'text',
                        label: 'CSS Class',
                        defaultValue: ''
                    },
                    style: {
                        type: 'text',
                        label: 'Inline Style',
                        defaultValue: ''
                    }
                },
                meta: {
                    innerHTML: {
                        type: 'textarea',
                        label: 'Content',
                        defaultValue: 'Minor Heading'
                    }
                },
                events: {},
                alpine: {}
            });
            // Heading 5
            this.register({
                id: 'h5',
                htmlTag: 'h5',
                label: 'Heading 5',
                icon: '📜',
                category: 'content',
                properties: {
                    id: {
                        type: 'text',
                        label: 'ID',
                        defaultValue: '',
                        required: true
                    },
                    class: {
                        type: 'text',
                        label: 'CSS Class',
                        defaultValue: ''
                    },
                    style: {
                        type: 'text',
                        label: 'Inline Style',
                        defaultValue: ''
                    }
                },
                meta: {
                    innerHTML: {
                        type: 'textarea',
                        label: 'Content',
                        defaultValue: 'Small Heading'
                    }
                },
                events: {},
                alpine: {}
            });
            // Heading 6
            this.register({
                id: 'h6',
                htmlTag: 'h6',
                label: 'Heading 6',
                icon: '🗒️',
                category: 'content',
                properties: {
                    id: {
                        type: 'text',
                        label: 'ID',
                        defaultValue: '',
                        required: true
                    },
                    class: {
                        type: 'text',
                        label: 'CSS Class',
                        defaultValue: ''
                    },
                    style: {
                        type: 'text',
                        label: 'Inline Style',
                        defaultValue: ''
                    }
                },
                meta: {
                    innerHTML: {
                        type: 'textarea',
                        label: 'Content',
                        defaultValue: 'Smallest Heading'
                    }
                },
                events: {},
                alpine: {}
            });
            // Paragraph
            this.register({
                id: 'paragraph',
                htmlTag: 'p',
                label: 'Paragraph',
                icon: '📃',
                category: 'content',
                properties: {
                    id: {
                        type: 'text',
                        label: 'ID',
                        defaultValue: '',
                        required: true
                    },
                    class: {
                        type: 'text',
                        label: 'CSS Class',
                        defaultValue: ''
                    },
                    style: {
                        type: 'text',
                        label: 'Inline Style',
                        defaultValue: ''
                    }
                },
                meta: {
                    innerHTML: {
                        type: 'textarea',
                        label: 'Content',
                        defaultValue: 'This is a paragraph of text.'
                    }
                },
                events: {},
                alpine: {}
            });
            // Preformatted Text
            this.register({
                id: 'pre',
                htmlTag: 'pre',
                label: 'Preformatted Text',
                icon: '📄',
                category: 'content',
                properties: {
                    id: {
                        type: 'text',
                        label: 'ID',
                        defaultValue: '',
                        required: true
                    },
                    class: {
                        type: 'text',
                        label: 'CSS Class',
                        defaultValue: ''
                    },
                    style: {
                        type: 'text',
                        label: 'Inline Style',
                        defaultValue: ''
                    }
                },
                meta: {
                    innerHTML: {
                        type: 'textarea',
                        label: 'Content',
                        defaultValue: 'This is preformatted text.\n  Spaces and line breaks\n    are preserved exactly.'
                    }
                },
                events: {},
                alpine: {}
            });
            // Code Element
            this.register({
                id: 'code',
                htmlTag: 'code',
                label: 'Code',
                icon: '💻',
                category: 'content',
                properties: {
                    id: {
                        type: 'text',
                        label: 'ID',
                        defaultValue: '',
                        required: true
                    },
                    class: {
                        type: 'text',
                        label: 'CSS Class',
                        defaultValue: 'language-javascript'
                    },
                    style: {
                        type: 'text',
                        label: 'Inline Style',
                        defaultValue: ''
                    }
                },
                meta: {
                    innerHTML: {
                        type: 'textarea',
                        label: 'Content',
                        defaultValue: 'console.log("Hello, World!");'
                    }
                },
                events: {},
                alpine: {}
            });
            // Blockquote
            this.register({
                id: 'blockquote',
                htmlTag: 'blockquote',
                label: 'Blockquote',
                icon: '💬',
                category: 'content',
                properties: {
                    id: {
                        type: 'text',
                        label: 'ID',
                        defaultValue: '',
                        required: true
                    },
                    cite: {
                        type: 'text',
                        label: 'Citation URL',
                        defaultValue: ''
                    },
                    class: {
                        type: 'text',
                        label: 'CSS Class',
                        defaultValue: ''
                    },
                    style: {
                        type: 'text',
                        label: 'Inline Style',
                        defaultValue: ''
                    }
                },
                meta: this.getStandardMeta({
                    label: {
                        type: 'textarea',
                        label: 'Quote Text',
                        defaultValue: 'This is a quotation from another source.'
                    },
                    icon: {
                        type: 'text',
                        label: 'Icon',
                        defaultValue: '💬'
                    },
                    author: {
                        type: 'text',
                        label: 'Author',
                        defaultValue: ''
                    }
                }),
            });
            // Horizontal Rule
            this.register({
                id: 'hr',
                htmlTag: 'hr',
                label: 'Horizontal Rule',
                icon: '➖',
                category: 'content',
                properties: {
                    id: {
                        type: 'text',
                        label: 'ID',
                        defaultValue: '',
                        required: true
                    },
                    class: {
                        type: 'text',
                        label: 'CSS Class',
                        defaultValue: ''
                    },
                    style: {
                        type: 'text',
                        label: 'Inline Style',
                        defaultValue: ''
                    }
                },
                meta: {},
                events: {},
                alpine: {}
            });
            // Break
            this.register({
                id: 'br',
                htmlTag: 'br',
                label: 'Line Break',
                icon: '↩️',
                category: 'content',
                properties: {
                    id: {
                        type: 'text',
                        label: 'ID',
                        defaultValue: '',
                        required: true
                    },
                    class: {
                        type: 'text',
                        label: 'CSS Class',
                        defaultValue: ''
                    }
                },
            });
            // Div Element
            this.register({
                id: 'div',
                htmlTag: 'div',
                label: 'Division',
                icon: '📦',
                category: 'content',
                properties: {
                    id: {
                        type: 'text',
                        label: 'ID',
                        defaultValue: '',
                        required: true
                    },
                    class: {
                        type: 'text',
                        label: 'CSS Class',
                        defaultValue: ''
                    },
                    style: {
                        type: 'text',
                        label: 'Inline Style',
                        defaultValue: ''
                    }
                },
                meta: this.getStandardMeta({
                    innerHTML: {
                        type: 'textarea',
                        label: 'Content',
                        defaultValue: 'Container content'
                    },
                }),
            });
            // Span Element
            this.register({
                id: 'span',
                htmlTag: 'span',
                label: 'Span',
                icon: '🏷️',
                category: 'content',
                properties: {
                    id: {
                        type: 'text',
                        label: 'ID',
                        defaultValue: '',
                        required: true
                    },
                    class: {
                        type: 'text',
                        label: 'CSS Class',
                        defaultValue: ''
                    },
                    style: {
                        type: 'text',
                        label: 'Inline Style',
                        defaultValue: ''
                    }
                },
                meta: {
                    innerHTML: {
                        type: 'textarea',
                        label: 'Content',
                        defaultValue: 'Inline text'
                    }
                },
                events: {},
                alpine: {}
            });
            // Media Elements
            this.register({
                id: 'image',
                htmlTag: 'img',
                label: 'Image',
                icon: '🖼️',
                category: 'media',
                properties: {
                    id: {
                        type: 'text',
                        label: 'ID',
                        defaultValue: '',
                        required: true
                    },
                    src: {
                        type: 'text',
                        label: 'Source URL',
                        defaultValue: 'https://via.placeholder.com/300x200',
                        required: true
                    },
                    alt: {
                        type: 'text',
                        label: 'Alt Text',
                        defaultValue: 'Placeholder image',
                        required: true
                    },
                    width: {
                        type: 'number',
                        label: 'Width',
                        defaultValue: 300
                    },
                    height: {
                        type: 'number',
                        label: 'Height',
                        defaultValue: 200
                    },
                    title: {
                        type: 'text',
                        label: 'Title (Tooltip)',
                        defaultValue: ''
                    },
                    loading: {
                        type: 'select',
                        label: 'Loading',
                        defaultValue: 'lazy',
                        options: [
                            { value: 'lazy', label: 'Lazy' },
                            { value: 'eager', label: 'Eager' }
                        ]
                    },
                    decoding: {
                        type: 'select',
                        label: 'Decoding',
                        defaultValue: 'auto',
                        options: [
                            { value: 'auto', label: 'Auto' },
                            { value: 'sync', label: 'Sync' },
                            { value: 'async', label: 'Async' }
                        ]
                    },
                    crossorigin: {
                        type: 'select',
                        label: 'Cross Origin',
                        defaultValue: '',
                        options: [
                            { value: '', label: 'None' },
                            { value: 'anonymous', label: 'Anonymous' },
                            { value: 'use-credentials', label: 'Use Credentials' }
                        ]
                    },
                    referrerpolicy: {
                        type: 'select',
                        label: 'Referrer Policy',
                        defaultValue: '',
                        options: [
                            { value: '', label: 'Default' },
                            { value: 'no-referrer', label: 'No Referrer' },
                            { value: 'no-referrer-when-downgrade', label: 'No Referrer When Downgrade' },
                            { value: 'origin', label: 'Origin' },
                            { value: 'origin-when-cross-origin', label: 'Origin When Cross Origin' },
                            { value: 'same-origin', label: 'Same Origin' },
                            { value: 'strict-origin', label: 'Strict Origin' },
                            { value: 'strict-origin-when-cross-origin', label: 'Strict Origin When Cross Origin' },
                            { value: 'unsafe-url', label: 'Unsafe URL' }
                        ]
                    },
                    sizes: {
                        type: 'text',
                        label: 'Sizes',
                        defaultValue: '',
                        description: 'e.g., (max-width: 600px) 100vw, 50vw'
                    },
                    srcset: {
                        type: 'textarea',
                        label: 'Srcset (Responsive Images)',
                        defaultValue: '',
                        description: 'e.g., small.jpg 480w, medium.jpg 800w, large.jpg 1200w'
                    },
                    class: {
                        type: 'text',
                        label: 'CSS Class',
                        defaultValue: ''
                    },
                    style: {
                        type: 'text',
                        label: 'Inline Style',
                        defaultValue: ''
                    }
                },
            });
            // Additional Media Elements
            this.register({
                id: 'video',
                htmlTag: 'video',
                label: 'Video',
                icon: '🎥',
                category: 'media',
                properties: {
                    id: { type: 'text', label: 'ID', defaultValue: '', required: true },
                    src: { type: 'text', label: 'Source URL', defaultValue: '' },
                    controls: { type: 'boolean', label: 'Show Controls', defaultValue: true },
                    autoplay: { type: 'boolean', label: 'Autoplay', defaultValue: false },
                    muted: { type: 'boolean', label: 'Muted', defaultValue: false },
                    loop: { type: 'boolean', label: 'Loop', defaultValue: false },
                    poster: { type: 'text', label: 'Poster Image URL', defaultValue: '' },
                    width: { type: 'number', label: 'Width', defaultValue: 640 },
                    height: { type: 'number', label: 'Height', defaultValue: 360 }
                }
            });
            this.register({
                id: 'audio',
                htmlTag: 'audio',
                label: 'Audio',
                icon: '🎵',
                category: 'media',
                properties: {
                    id: { type: 'text', label: 'ID', defaultValue: '', required: true },
                    src: { type: 'text', label: 'Source URL', defaultValue: '' },
                    controls: { type: 'boolean', label: 'Show Controls', defaultValue: true },
                    autoplay: { type: 'boolean', label: 'Autoplay', defaultValue: false },
                    muted: { type: 'boolean', label: 'Muted', defaultValue: false },
                    loop: { type: 'boolean', label: 'Loop', defaultValue: false }
                }
            });
            this.register({
                id: 'iframe',
                htmlTag: 'iframe',
                label: 'IFrame',
                icon: '🖼️📱',
                category: 'media',
                properties: {
                    id: { type: 'text', label: 'ID', defaultValue: '', required: true },
                    src: { type: 'text', label: 'Source URL', defaultValue: 'https://www.example.com' },
                    width: { type: 'number', label: 'Width', defaultValue: 640 },
                    height: { type: 'number', label: 'Height', defaultValue: 480 },
                    frameborder: { type: 'select', label: 'Frame Border', defaultValue: '0', options: [
                            { value: '0', label: 'No Border' },
                            { value: '1', label: 'With Border' }
                        ] },
                    allowfullscreen: { type: 'boolean', label: 'Allow Fullscreen', defaultValue: false },
                    class: {
                        type: 'text',
                        label: 'CSS Class',
                        defaultValue: ''
                    },
                    style: {
                        type: 'text',
                        label: 'Inline Style',
                        defaultValue: ''
                    }
                }
            });
            this.register({
                id: 'canvas',
                htmlTag: 'canvas',
                label: 'Canvas',
                icon: '🎨',
                category: 'media',
                properties: {
                    id: { type: 'text', label: 'ID', defaultValue: '', required: true },
                    width: { type: 'number', label: 'Width', defaultValue: 300 },
                    height: { type: 'number', label: 'Height', defaultValue: 150 },
                    class: {
                        type: 'text',
                        label: 'CSS Class',
                        defaultValue: ''
                    },
                    style: {
                        type: 'text',
                        label: 'Inline Style',
                        defaultValue: ''
                    }
                }
            });
            this.register({
                id: 'svg',
                htmlTag: 'svg',
                label: 'SVG',
                icon: '🖌️',
                category: 'media',
                properties: {
                    id: { type: 'text', label: 'ID', defaultValue: '', required: true },
                    width: { type: 'number', label: 'Width', defaultValue: 100 },
                    height: { type: 'number', label: 'Height', defaultValue: 100 },
                    viewBox: { type: 'text', label: 'ViewBox', defaultValue: '0 0 100 100' },
                    class: {
                        type: 'text',
                        label: 'CSS Class',
                        defaultValue: ''
                    },
                    style: {
                        type: 'text',
                        label: 'Inline Style',
                        defaultValue: ''
                    }
                }
            });
        }
        /**
         * Register a new element type
         */
        register(config) {
            this.elements.set(config.id, config);
        }
        /**
         * Unregister an element type
         */
        unregister(id) {
            this.elements.delete(id);
        }
        /**
         * Get an element configuration by ID
         */
        get(id) {
            return this.elements.get(id);
        }
        /**
         * Get all registered elements
         */
        getAll() {
            return Array.from(this.elements.values());
        }
        /**
         * Get elements by category
         */
        getByCategory(category) {
            return this.getAll().filter(element => element.category === category);
        }
        /**
         * Check if an element type exists
         */
        has(id) {
            return this.elements.has(id);
        }
        /**
         * Validate a custom element registry configuration
         */
        static validateRegistry(registry) {
            try {
                for (const [id, config] of Object.entries(registry)) {
                    if (!config.id || config.id !== id) {
                        throw new Error(`Element "${id}": Invalid or missing ID`);
                    }
                    if (!config.htmlTag || typeof config.htmlTag !== 'string') {
                        throw new Error(`Element "${id}": Invalid or missing htmlTag`);
                    }
                    if (!config.label || typeof config.label !== 'string') {
                        throw new Error(`Element "${id}": Invalid or missing label`);
                    }
                    // Validate properties section
                    if (config.properties && typeof config.properties !== 'object') {
                        throw new Error(`Element "${id}": Properties must be an object`);
                    }
                    // Validate meta section
                    if (config.meta && typeof config.meta !== 'object') {
                        throw new Error(`Element "${id}": Meta must be an object`);
                    }
                    // Validate events section
                    if (config.events && typeof config.events !== 'object') {
                        throw new Error(`Element "${id}": Events must be an object`);
                    }
                    // Validate alpine section
                    if (config.alpine && typeof config.alpine !== 'object') {
                        throw new Error(`Element "${id}": Alpine must be an object`);
                    }
                }
                return true;
            }
            catch (error) {
                const errorMessage = error instanceof Error ? error.message : 'Unknown validation error';
                console.error('ElementRegistry validation failed:', errorMessage);
                return false;
            }
        }
        /**
         * Load custom registry configuration, replacing existing elements
         */
        loadCustomRegistry(registry) {
            if (!ElementRegistry.validateRegistry(registry)) {
                throw new Error('Invalid registry configuration');
            }
            // Clear existing elements
            this.elements.clear();
            // Register all custom elements
            for (const config of Object.values(registry)) {
                this.register(config);
            }
        }
        /**
         * Get all elements as a plain object (for export/serialization)
         */
        toJSON() {
            const result = {};
            for (const [id, config] of this.elements) {
                result[id] = config;
            }
            return result;
        }
    }
    /**
     * Standard meta fields for all form controls
     */
    ElementRegistry.STANDARD_META = {
        label: {
            type: 'text',
            label: 'Label',
            defaultValue: 'Field',
            required: true
        },
        hint: {
            type: 'text',
            label: 'Hint',
            defaultValue: ''
        },
        helperText: {
            type: 'textarea',
            label: 'Helper Text',
            defaultValue: ''
        },
        icon: {
            type: 'text',
            label: 'Icon',
            defaultValue: '📝'
        },
        wrapperClasses: {
            type: 'css-classes',
            label: 'CSS Classes',
            defaultValue: []
        },
        validation: {
            type: 'textarea',
            label: 'Validation Rules',
            defaultValue: '',
            description: 'JSON validation rules'
        }
    };
    /**
     * Standard events for all form controls (HTML5 compatible)
     */
    ElementRegistry.STANDARD_EVENTS = {
        onChange: {
            type: 'event',
            label: 'On Change (change)',
            defaultValue: { action: '', target: 'vanilla', parameters: {} }
        },
        onInput: {
            type: 'event',
            label: 'On Input (input)',
            defaultValue: { action: '', target: 'vanilla', parameters: {} }
        },
        onFocus: {
            type: 'event',
            label: 'On Focus (focus)',
            defaultValue: { action: '', target: 'vanilla', parameters: {} }
        },
        onBlur: {
            type: 'event',
            label: 'On Blur (blur)',
            defaultValue: { action: '', target: 'vanilla', parameters: {} }
        },
        onClick: {
            type: 'event',
            label: 'On Click (click)',
            defaultValue: { action: '', target: 'vanilla', parameters: {} }
        },
        onKeyDown: {
            type: 'event',
            label: 'On Key Down (keydown)',
            defaultValue: { action: '', target: 'vanilla', parameters: {} }
        },
        onKeyUp: {
            type: 'event',
            label: 'On Key Up (keyup)',
            defaultValue: { action: '', target: 'vanilla', parameters: {} }
        },
        onSubmit: {
            type: 'event',
            label: 'On Submit (submit)',
            defaultValue: { action: '', target: 'vanilla', parameters: {} }
        }
    };
    /**
     * Standard Alpine.js attributes for form controls
     */
    ElementRegistry.STANDARD_ALPINE = {
        'x-model': {
            type: 'alpine',
            label: 'x-model',
            defaultValue: ''
        },
        'x-data': {
            type: 'alpine',
            label: 'x-data',
            defaultValue: ''
        },
        'x-show': {
            type: 'alpine',
            label: 'x-show',
            defaultValue: ''
        },
        'x-if': {
            type: 'alpine',
            label: 'x-if',
            defaultValue: ''
        }
    };

    /**
     * Simple event emitter implementation
     */
    class SimpleEventEmitter {
        constructor() {
            this.events = new Map();
        }
        on(event, callback) {
            if (!this.events.has(event)) {
                this.events.set(event, []);
            }
            this.events.get(event).push(callback);
        }
        off(event, callback) {
            const callbacks = this.events.get(event);
            if (callbacks) {
                const index = callbacks.indexOf(callback);
                if (index > -1) {
                    callbacks.splice(index, 1);
                }
            }
        }
        emit(event, data) {
            const callbacks = this.events.get(event);
            if (callbacks) {
                callbacks.forEach(callback => callback(data));
            }
        }
    }
    /**
     * Utility functions
     */
    class Utils {
        static generateId() {
            return 'element_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now().toString(36);
        }
        static createElement(html) {
            const template = document.createElement('template');
            template.innerHTML = html.trim();
            return template.content.firstElementChild;
        }
        static debounce(func, wait) {
            let timeout;
            return ((...args) => {
                clearTimeout(timeout);
                timeout = window.setTimeout(() => func.apply(this, args), wait);
            });
        }
        static deepClone(obj) {
            return JSON.parse(JSON.stringify(obj));
        }
        static formatDate(date) {
            return date.toISOString();
        }
    }

    /**
     * Manages the properties panel for editing form elements
     */
    class PropertyPanel extends SimpleEventEmitter {
        constructor(container) {
            super();
            this.container = container;
            this.currentElement = null;
            this.currentConfig = null;
            this.currentElementType = null;
        }
        /**
         * Check if element can have meta/events/alpine properties based on category
         */
        canHaveExtendedProperties(element, config) {
            // Row and column elements can only have basic properties
            if (this.currentElementType === 'row' || this.currentElementType === 'column') {
                return false;
            }
            // Form elements can have extended properties
            if (this.currentElementType === 'form') {
                return true;
            }
            // All field elements (form and content) can have extended properties
            if (this.currentElementType === 'field') {
                return true;
            }
            // Fallback: check config category directly
            return config && (config.category === 'form' || config.category === 'content');
        }
        /**
         * Show properties for a form element
         */
        showProperties(element, config, elementType) {
            this.currentElement = element;
            this.currentConfig = config;
            this.currentElementType = elementType;
            // Debug: Check if this is a content element
            console.log('=== PropertyPanel Debug ===');
            console.log('Element:', element);
            console.log('Config:', config);
            console.log('Element Type:', elementType);
            console.log('Config Category:', config.category);
            console.log('Can have extended props:', this.canHaveExtendedProperties(element, config));
            console.log('Meta config keys:', config.meta ? Object.keys(config.meta) : 'No meta');
            this.render();
        }
        /**
         * Hide properties panel
         */
        hideProperties() {
            this.currentElement = null;
            this.currentConfig = null;
            this.container.innerHTML = '<p class="no-selection">Select an element to edit its properties</p>';
        }
        /**
         * Render the properties panel
         */
        render() {
            if (!this.currentElement || !this.currentConfig) {
                this.hideProperties();
                return;
            }
            const html = `
            <div class="properties-content">
                <div class="property-group">
                    <div class="element-header-with-delete">
                        <h4>Element: ${this.currentConfig.label}</h4>
                        <button type="button" class="btn-delete-element" id="deleteElement" title="Delete Element">
                            🗑️
                        </button>
                    </div>
                </div>
                
                ${this.renderGroupedProperties()}
            </div>
        `;
            this.container.innerHTML = html;
            this.attachEventListeners();
        }
        /**
         * Render grouped properties with toggles for properties, meta, events, and alpine
         */
        renderGroupedProperties() {
            if (!this.currentConfig || !this.currentElement) {
                return '';
            }
            const groups = [
                { key: 'properties', label: 'Properties', icon: '⚙️', config: this.currentConfig.properties || {} },
                { key: 'meta', label: 'Meta', icon: '📋', config: this.currentConfig.meta || {} },
                { key: 'events', label: 'Events', icon: '⚡', config: this.currentConfig.events || {} },
                { key: 'alpine', label: 'Alpine', icon: '🏔️', config: this.currentConfig.alpine || {} }
            ];
            // Debug logging
            console.log('PropertyPanel groups before filter:', groups.map(g => ({
                key: g.key,
                configKeys: Object.keys(g.config),
                hasConfig: Object.keys(g.config).length > 0
            })));
            console.log('Element category:', this.currentConfig.category);
            console.log('Can have extended properties:', this.currentElement && this.currentConfig &&
                this.canHaveExtendedProperties(this.currentElement, this.currentConfig));
            return groups
                // TEMPORARILY SHOW ALL GROUPS FOR DEBUGGING
                .filter(group => Object.keys(group.config).length > 0)
                .map(group => this.renderPropertyGroup(group.key, group.label, group.icon, group.config))
                .join('');
        }
        /**
         * Render a property group with collapsible header
         */
        renderPropertyGroup(groupKey, label, icon, config) {
            const groupId = `group-${groupKey}`;
            const properties = Object.entries(config)
                .map(([key, propertyConfig]) => this.renderPropertyField(key, propertyConfig, groupKey))
                .join('');
            return `
            <div class="property-group">
                <div class="group-header" data-group="${groupKey}">
                    <span class="group-icon">${icon}</span>
                    <span class="group-title">${label}</span>
                    <span class="group-toggle">▼</span>
                </div>
                <div class="group-content" id="${groupId}">
                    ${properties}
                </div>
            </div>
        `;
        }
        /**
         * Get property value from the appropriate section
         */
        getPropertyValue(key, groupKey, config) {
            if (!this.currentElement || !this.currentConfig) {
                return config.defaultValue ?? '';
            }
            let section;
            switch (groupKey) {
                case 'properties':
                    section = this.currentElement.properties;
                    break;
                case 'meta':
                    if (this.canHaveExtendedProperties(this.currentElement, this.currentConfig)) {
                        section = this.currentElement.meta;
                    }
                    break;
                case 'events':
                    if (this.canHaveExtendedProperties(this.currentElement, this.currentConfig)) {
                        section = this.currentElement.events;
                    }
                    break;
                case 'alpine':
                    if (this.canHaveExtendedProperties(this.currentElement, this.currentConfig)) {
                        section = this.currentElement.alpine;
                    }
                    break;
                default:
                    section = this.currentElement.properties;
            }
            return section?.[key] ?? config.defaultValue ?? '';
        }
        /**
         * Render property fields
         */
        renderProperties() {
            if (!this.currentConfig || !this.currentElement) {
                return '';
            }
            return Object.entries(this.currentConfig.properties || {})
                .map(([key, config]) => this.renderPropertyField(key, config, 'properties'))
                .join('');
        }
        /**
         * Render a single property field
         */
        renderPropertyField(key, config, groupKey = 'properties') {
            const value = this.getPropertyValue(key, groupKey, config);
            const fieldId = `prop_${groupKey}_${key}`;
            let input = '';
            switch (config.type) {
                case 'text':
                    input = `<input type="text" id="${fieldId}" value="${this.escapeHtml(value)}" />`;
                    break;
                case 'textarea':
                    input = `<textarea id="${fieldId}" rows="3">${this.escapeHtml(value)}</textarea>`;
                    break;
                case 'number':
                    input = `<input type="number" id="${fieldId}" value="${value}" />`;
                    break;
                case 'boolean':
                    input = `
                    <label class="switch">
                        <input type="checkbox" id="${fieldId}" ${value ? 'checked' : ''} />
                        <span class="slider"></span>
                    </label>
                `;
                    break;
                case 'select':
                    const options = config.options || [];
                    const optionsList = options.map(opt => `<option value="${this.escapeHtml(opt.value)}" ${opt.value === value ? 'selected' : ''}>${this.escapeHtml(opt.label)}</option>`).join('');
                    input = `<select id="${fieldId}">${optionsList}</select>`;
                    break;
                case 'color':
                    input = `<input type="color" id="${fieldId}" value="${value}" />`;
                    break;
                case 'event':
                    const eventValue = typeof value === 'object' ? value : { action: '', target: 'vanilla', parameters: {} };
                    input = `
                    <div class="event-config">
                        <input type="text" id="${fieldId}_action" placeholder="Action" value="${this.escapeHtml(eventValue.action || '')}" />
                        <select id="${fieldId}_target">
                            <option value="vanilla" ${eventValue.target === 'vanilla' ? 'selected' : ''}>Vanilla JS</option>
                            <option value="alpine" ${eventValue.target === 'alpine' ? 'selected' : ''}>Alpine.js</option>
                            <option value="livewire" ${eventValue.target === 'livewire' ? 'selected' : ''}>Livewire</option>
                        </select>
                    </div>
                `;
                    break;
                case 'alpine':
                    input = `<input type="text" id="${fieldId}" value="${this.escapeHtml(value)}" placeholder="Alpine.js directive" />`;
                    break;
                case 'css-classes':
                    const classValue = Array.isArray(value) ? value.join(' ') : String(value || '');
                    input = `<input type="text" id="${fieldId}" value="${this.escapeHtml(classValue)}" placeholder="CSS classes" />`;
                    break;
                case 'fixed':
                    input = `<input type="text" id="${fieldId}" value="${this.escapeHtml(value)}" readonly />`;
                    break;
                default:
                    input = `<input type="text" id="${fieldId}" value="${this.escapeHtml(value)}" />`;
                    break;
            }
            // Create label with required indicator
            const labelText = config.required
                ? `<strong>${config.label} <span style="color: #e74c3c;">*</span></strong>`
                : config.label;
            return `
            <div class="property-field">
                <label for="${fieldId}">${labelText}</label>
                <div class="property-value">
                    ${input}
                </div>
                ${config.description ? `<small>${config.description}</small>` : ''}
            </div>
        `;
        }
        /**
         * Attach event listeners to property inputs and group toggles
         */
        attachEventListeners() {
            if (!this.currentConfig || !this.currentElement) {
                return;
            }
            // Group toggle listeners
            this.container.querySelectorAll('.group-header').forEach(header => {
                header.addEventListener('click', (e) => {
                    const groupKey = e.currentTarget.dataset.group;
                    if (groupKey) {
                        this.toggleGroup(groupKey);
                    }
                });
            });
            // Property change listeners for all groups
            const groups = ['properties', 'meta', 'events', 'alpine'];
            groups.forEach(groupKey => {
                const config = this.getGroupConfig(groupKey);
                if (config) {
                    Object.keys(config).forEach(key => {
                        const propertyConfig = config[key];
                        // Skip event listeners for fixed properties
                        if (propertyConfig.type === 'fixed') {
                            return;
                        }
                        const input = this.container.querySelector(`#prop_${groupKey}_${key}`);
                        if (input) {
                            const debouncedUpdate = Utils.debounce(() => {
                                this.updateProperty(key, this.getInputValue(input), groupKey);
                            }, 150); // Reduced from 300ms to 150ms for faster response
                            input.addEventListener('input', debouncedUpdate);
                            input.addEventListener('change', () => {
                                // Immediate update on change (blur, select, etc.)
                                this.updateProperty(key, this.getInputValue(input), groupKey);
                            });
                        }
                        // Handle event type fields (action and target)
                        if (propertyConfig.type === 'event') {
                            const actionInput = this.container.querySelector(`#prop_${groupKey}_${key}_action`);
                            const targetInput = this.container.querySelector(`#prop_${groupKey}_${key}_target`);
                            if (actionInput && targetInput) {
                                const updateEvent = () => {
                                    const eventValue = {
                                        action: actionInput.value,
                                        target: targetInput.value,
                                        parameters: {}
                                    };
                                    this.updateProperty(key, eventValue, groupKey);
                                };
                                actionInput.addEventListener('input', Utils.debounce(updateEvent, 150));
                                actionInput.addEventListener('change', updateEvent); // Immediate update on change
                                targetInput.addEventListener('change', updateEvent);
                            }
                        }
                    });
                }
            });
            // Delete button
            const deleteBtn = this.container.querySelector('#deleteElement');
            if (deleteBtn) {
                deleteBtn.addEventListener('click', () => {
                    if (this.currentElement) {
                        this.emit('deleteElement', { elementId: this.currentElement.id });
                        this.hideProperties();
                    }
                });
            }
        }
        /**
         * Toggle group visibility
         */
        toggleGroup(groupKey) {
            const content = this.container.querySelector(`#group-${groupKey}`);
            const toggle = this.container.querySelector(`[data-group="${groupKey}"] .group-toggle`);
            if (content && toggle) {
                const isExpanded = content.style.display !== 'none';
                content.style.display = isExpanded ? 'none' : 'block';
                toggle.textContent = isExpanded ? '▶' : '▼';
            }
        }
        /**
         * Get configuration for a specific group
         */
        getGroupConfig(groupKey) {
            if (!this.currentConfig)
                return null;
            switch (groupKey) {
                case 'properties':
                    return this.currentConfig.properties || {};
                case 'meta':
                    return this.currentConfig.meta || {};
                case 'events':
                    return this.currentConfig.events || {};
                case 'alpine':
                    return this.currentConfig.alpine || {};
                default:
                    return null;
            }
        }
        /**
         * Get value from input element based on its type
         */
        getInputValue(input) {
            switch (input.type) {
                case 'checkbox':
                    return input.checked;
                case 'number':
                    return parseFloat(input.value) || 0;
                default:
                    return input.value;
            }
        }
        /**
         * Update a property value in the appropriate section
         */
        updateProperty(key, value, groupKey = 'properties') {
            if (!this.currentElement || !this.currentConfig) {
                return;
            }
            // Ensure the section exists
            let section;
            switch (groupKey) {
                case 'properties':
                    if (!this.currentElement.properties) {
                        this.currentElement.properties = {};
                    }
                    section = this.currentElement.properties;
                    break;
                case 'meta':
                    if (this.canHaveExtendedProperties(this.currentElement, this.currentConfig)) {
                        const fieldElement = this.currentElement;
                        if (!fieldElement.meta) {
                            fieldElement.meta = {};
                        }
                        section = fieldElement.meta;
                    }
                    else {
                        console.warn('Element cannot have meta properties:', this.currentElement);
                        return;
                    }
                    break;
                case 'events':
                    if (this.canHaveExtendedProperties(this.currentElement, this.currentConfig)) {
                        const eventElement = this.currentElement;
                        if (!eventElement.events) {
                            eventElement.events = {};
                        }
                        section = eventElement.events;
                    }
                    else {
                        console.warn('Element cannot have event properties:', this.currentElement);
                        return;
                    }
                    break;
                case 'alpine':
                    if (this.canHaveExtendedProperties(this.currentElement, this.currentConfig)) {
                        const alpineElement = this.currentElement;
                        if (!alpineElement.alpine) {
                            alpineElement.alpine = {};
                        }
                        section = alpineElement.alpine;
                    }
                    else {
                        console.warn('Element cannot have alpine properties:', this.currentElement);
                        return;
                    }
                    break;
                default:
                    if (!this.currentElement.properties) {
                        this.currentElement.properties = {};
                    }
                    section = this.currentElement.properties;
            }
            section[key] = value;
            this.emit('propertyChanged', {
                elementId: this.currentElement.id,
                property: key,
                value: value,
                element: this.currentElement,
                section: groupKey
            });
        }
        /**
         * Escape HTML for safe rendering
         */
        escapeHtml(unsafe) {
            if (typeof unsafe !== 'string') {
                unsafe = String(unsafe || '');
            }
            return unsafe
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#039;");
        }
        /**
         * Get current element being edited
         */
        getCurrentElement() {
            return this.currentElement;
        }
    }

    /**
     * Manages drag and drop functionality with container scoping
     */
    class DragDropManager extends SimpleEventEmitter {
        constructor(container, scopedDOM) {
            super();
            this.container = container;
            this.scopedDOM = scopedDOM;
            this.draggedData = null;
            // Use a timeout to ensure DOM is ready
            setTimeout(() => {
                this.initializeDragAndDrop();
            }, 100);
        }
        /**
         * Initialize drag and drop event listeners with scope safety
         */
        initializeDragAndDrop() {
            // Use event delegation only for all drag events to avoid conflicts
            this.setupDropZones();
        }
        /**
         * Setup drop zones with scoped event delegation
         */
        setupDropZones() {
            // Helper function to add scoped event listeners for drop zones
            const addScopedListener = (event, handler) => {
                if (this.scopedDOM) {
                    this.scopedDOM.addEventListener(event, handler);
                }
                else {
                    this.container.addEventListener(event, handler);
                }
            };
            // Handle drag start from toolbox and existing elements
            addScopedListener('dragstart', (e) => {
                const event = e;
                const target = event.target;
                // Validate element is in scope if using ScopedDOM
                if (this.scopedDOM && !this.scopedDOM.validateOperation(target, 'dragstart')) {
                    event.preventDefault();
                    return;
                }
                this.handleDragStart(event, target);
            });
            // Handle drag over
            addScopedListener('dragover', (e) => {
                const event = e;
                const target = event.target;
                if (this.scopedDOM && !this.scopedDOM.validateOperation(target, 'dragover')) {
                    return;
                }
                this.handleDragOver(event, target);
            });
            // Handle drag leave
            addScopedListener('dragleave', (e) => {
                const event = e;
                const target = event.target;
                if (this.scopedDOM && !this.scopedDOM.validateOperation(target, 'dragleave')) {
                    return;
                }
                this.handleDragLeave(event, target);
            });
            // Handle drop
            addScopedListener('drop', (e) => {
                const event = e;
                const target = event.target;
                if (this.scopedDOM && !this.scopedDOM.validateOperation(target, 'drop')) {
                    return;
                }
                this.handleDrop(event, target);
            });
            // Handle drag end
            addScopedListener('dragend', (e) => {
                const event = e;
                const target = event.target;
                if (this.scopedDOM && !this.scopedDOM.validateOperation(target, 'dragend')) {
                    return;
                }
                this.handleDragEnd(event, target);
            });
        }
        /**
         * Handle drag start events
         */
        handleDragStart(e, target) {
            // Handle drag start from toolbox elements
            const elementItem = target.closest('.element-item');
            if (elementItem) {
                const elementType = elementItem.dataset.elementType;
                if (elementType) {
                    this.draggedData = {
                        elementType,
                        isNew: true,
                        sourceType: 'toolbox'
                    };
                    this.emit('dragStart', this.draggedData);
                    if (e.dataTransfer) {
                        e.dataTransfer.effectAllowed = 'copy';
                        e.dataTransfer.setData('text/plain', elementType);
                        e.dataTransfer.setData('application/x-drag-source', 'sidebar');
                    }
                    return;
                }
            }
            // Handle drag start from drag handle buttons (🕹️)
            const dragHandle = target.closest('.drag-handle-btn');
            if (dragHandle) {
                const elementId = dragHandle.dataset.elementId;
                const elementType = dragHandle.dataset.elementType;
                if (elementId && elementType) {
                    this.draggedData = {
                        elementType,
                        elementId,
                        isNew: false,
                        sourceType: elementType // 'row', 'column', or 'field'
                    };
                    this.emit('dragStart', this.draggedData);
                    if (e.dataTransfer) {
                        e.dataTransfer.effectAllowed = 'move';
                        e.dataTransfer.setData('application/x-element-id', elementId);
                        e.dataTransfer.setData('application/x-element-type', elementType);
                        e.dataTransfer.setData('application/x-drag-source', 'internal');
                    }
                    return;
                }
            }
            // Handle drag start from existing form elements (fallback)
            const formElement = target.closest('.form-element');
            if (formElement) {
                const elementId = formElement.dataset.elementId;
                const elementType = formElement.dataset.elementType;
                if (elementId && elementType) {
                    this.draggedData = {
                        elementType,
                        elementId,
                        isNew: false,
                        sourceType: 'field'
                    };
                    this.emit('dragStart', this.draggedData);
                    if (e.dataTransfer) {
                        e.dataTransfer.effectAllowed = 'move';
                        e.dataTransfer.setData('application/x-element-id', elementId);
                        e.dataTransfer.setData('application/x-element-type', elementType);
                        e.dataTransfer.setData('application/x-drag-source', 'internal');
                    }
                }
            }
        }
        /**
         * Handle drag over events
         */
        handleDragOver(e, target) {
            e.preventDefault();
            const dropZone = target.closest('.drop-zone');
            if (dropZone && this.draggedData) {
                dropZone.classList.add('drag-over');
                if (e.dataTransfer) {
                    e.dataTransfer.dropEffect = this.draggedData.isNew ? 'copy' : 'move';
                }
            }
        }
        /**
         * Handle drag leave events
         */
        handleDragLeave(e, target) {
            const dropZone = target.closest('.drop-zone');
            if (dropZone) {
                // Only remove if we're truly leaving the drop zone
                const rect = dropZone.getBoundingClientRect();
                const x = e.clientX;
                const y = e.clientY;
                if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
                    dropZone.classList.remove('drag-over');
                }
            }
        }
        /**
         * Handle drop events
         */
        handleDrop(e, target) {
            e.preventDefault();
            const dropZone = target.closest('.drop-zone');
            if (dropZone) {
                dropZone.classList.remove('drag-over');
            }
            if (this.draggedData) {
                this.emit('elementDropped', {
                    data: this.draggedData,
                    dropTarget: target,
                    event: e
                });
            }
            this.clearDraggedData();
        }
        /**
         * Handle drag end events
         */
        handleDragEnd(e, target) {
            // Remove all drag-over classes
            const scopeContainer = this.scopedDOM?.getContainer() || this.container;
            scopeContainer.querySelectorAll('.drag-over').forEach(el => {
                el.classList.remove('drag-over');
            });
            this.clearDraggedData();
        }
        /**
         * Clear current drag data
         */
        clearDraggedData() {
            this.draggedData = null;
        }
        /**
         * Get current drag data
         */
        getDraggedData() {
            return this.draggedData;
        }
        /**
         * Set drag data (useful for programmatic drag operations)
         */
        setDraggedData(data) {
            this.draggedData = data;
        }
        /**
         * Check if currently dragging
         */
        isDragging() {
            return this.draggedData !== null;
        }
        /**
         * Reset drag state
         */
        reset() {
            this.clearDraggedData();
            // Remove any lingering drag classes using scoped container
            const scopeContainer = this.scopedDOM?.getContainer() || this.container;
            scopeContainer.querySelectorAll('.drag-over, .dragging').forEach(el => {
                el.classList.remove('drag-over', 'dragging');
            });
        }
        /**
         * Reinitialize drag listeners for newly created elements
         */
        refresh() {
            // Since we're using pure event delegation now, 
            // no need to refresh individual listeners
            // The event delegation will handle all new elements automatically
        }
    }

    /**
     * Handles JSON export and import functionality
     */
    class JSONExporter {
        /**
         * Export form data to JSON
         */
        static export(rows, metadata) {
            const now = new Date();
            return {
                version: this.VERSION,
                rows: Utils.deepClone(rows),
                metadata: {
                    created: metadata?.created || Utils.formatDate(now),
                    modified: Utils.formatDate(now),
                    title: metadata?.title,
                    description: metadata?.description
                }
            };
        }
        /**
         * Import form data from JSON
         */
        static import(jsonData) {
            let data;
            if (typeof jsonData === 'string') {
                try {
                    data = JSON.parse(jsonData);
                }
                catch (error) {
                    throw new Error('Invalid JSON format');
                }
            }
            else {
                data = jsonData;
            }
            // Check if it's FormBuilderData format (new)
            if ('formElement' in data || ('metadata' in data && !('version' in data))) {
                const formBuilderData = data;
                // Validate FormBuilderData structure
                if (!Array.isArray(formBuilderData.rows)) {
                    throw new Error('Invalid form data structure: rows must be an array');
                }
                // Validate rows
                formBuilderData.rows.forEach((row, index) => {
                    if (!row.id || !Array.isArray(row.columns)) {
                        throw new Error(`Invalid row at index ${index}: missing required fields`);
                    }
                    row.columns.forEach((column, colIndex) => {
                        if (!column.id || typeof column.width !== 'number' || !Array.isArray(column.fields)) {
                            throw new Error(`Invalid column at row ${index}, column ${colIndex}: missing required fields`);
                        }
                    });
                });
                return Utils.deepClone(formBuilderData);
            }
            // Legacy FormData format
            const legacyData = data;
            // Validate legacy structure
            if (!legacyData.version || !Array.isArray(legacyData.rows)) {
                throw new Error('Invalid form data structure');
            }
            // Version compatibility check
            if (legacyData.version !== this.VERSION) {
                console.warn(`Form data version ${legacyData.version} may not be fully compatible with current version ${this.VERSION}`);
            }
            // Validate rows
            legacyData.rows.forEach((row, index) => {
                if (!row.id || !Array.isArray(row.columns)) {
                    throw new Error(`Invalid row at index ${index}: missing required fields`);
                }
                row.columns.forEach((column, colIndex) => {
                    if (!column.id || typeof column.width !== 'number' || !Array.isArray(column.fields)) {
                        throw new Error(`Invalid column at row ${index}, column ${colIndex}: missing required fields`);
                    }
                });
            });
            return Utils.deepClone(legacyData.rows);
        }
        /**
         * Download JSON file
         */
        static download(rows, filename = 'form-layout.json', metadata) {
            const data = this.export(rows, metadata);
            const json = JSON.stringify(data, null, 2);
            const blob = new Blob([json], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = filename;
            link.style.display = 'none';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        }
        /**
         * Upload and parse JSON file
         */
        static upload() {
            return new Promise((resolve, reject) => {
                const input = document.createElement('input');
                input.type = 'file';
                input.accept = '.json';
                input.style.display = 'none';
                input.addEventListener('change', (e) => {
                    const file = e.target.files?.[0];
                    if (!file) {
                        reject(new Error('No file selected'));
                        return;
                    }
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        try {
                            const content = e.target?.result;
                            const result = this.import(content);
                            resolve(result);
                        }
                        catch (error) {
                            reject(error);
                        }
                    };
                    reader.onerror = () => {
                        reject(new Error('Failed to read file'));
                    };
                    reader.readAsText(file);
                });
                document.body.appendChild(input);
                input.click();
                document.body.removeChild(input);
            });
        }
        /**
         * Validate form data structure
         */
        static validate(data) {
            if (!data || typeof data !== 'object') {
                return false;
            }
            if (!data.version || typeof data.version !== 'string') {
                return false;
            }
            if (!Array.isArray(data.rows)) {
                return false;
            }
            if (!data.metadata || typeof data.metadata !== 'object') {
                return false;
            }
            // Validate each row
            for (const row of data.rows) {
                if (!row.id || !Array.isArray(row.columns)) {
                    return false;
                }
                for (const column of row.columns) {
                    if (!column.id || typeof column.width !== 'number' || !Array.isArray(column.fields)) {
                        return false;
                    }
                    for (const field of column.fields) {
                        if (!field.id || !field.type || !field.properties) {
                            return false;
                        }
                        if (typeof field.id !== 'string' || typeof field.type !== 'string') {
                            return false;
                        }
                        if (typeof field.properties !== 'object') {
                            return false;
                        }
                    }
                }
            }
            return true;
        }
        /**
         * Create a preview of the form data
         */
        static createPreview(rows) {
            if (rows.length === 0) {
                return 'Empty form';
            }
            let totalFields = 0;
            let totalColumns = 0;
            rows.forEach(row => {
                totalColumns += row.columns.length;
                row.columns.forEach(column => {
                    totalFields += column.fields.length;
                });
            });
            const parts = [];
            if (rows.length > 0)
                parts.push(`${rows.length} row${rows.length > 1 ? 's' : ''}`);
            if (totalColumns > 0)
                parts.push(`${totalColumns} column${totalColumns > 1 ? 's' : ''}`);
            if (totalFields > 0)
                parts.push(`${totalFields} field${totalFields > 1 ? 's' : ''}`);
            return parts.join(', ');
        }
    }
    JSONExporter.VERSION = '0.1.0';

    /**
     * Base renderer with common utilities
     */
    class BaseRenderer {
        escapeHtml(text) {
            const div = document.createElement('div');
            div.textContent = text;
            return div.innerHTML;
        }
        formatAttributes(attributes) {
            return Object.entries(attributes)
                .filter(([_, value]) => value !== undefined && value !== null && value !== '')
                .map(([key, value]) => `${key}="${this.escapeHtml(String(value))}"`)
                .join(' ');
        }
        getFieldLabel(field) {
            return field.meta?.label || field.properties?.label || '';
        }
        getFieldName(field) {
            return field.properties?.name || field.properties?.id || '';
        }
        getFieldId(field) {
            return field.properties?.id || '';
        }
    }

    /**
     * Element Type Utilities
     * Centralized utilities for element type checking and validation
     */
    /**
     * HTML tags that are form controls and support labels and standard form behavior
     */
    const FORM_CONTROL_TAGS = [
        'input', 'textarea', 'select', 'button'
    ];
    /**
     * Layout HTML tags that define structure
     */
    const LAYOUT_ELEMENT_TAGS = [
        'div', 'section', 'fieldset', 'form'
    ];
    /**
     * Content HTML tags for display
     */
    const CONTENT_ELEMENT_TAGS = [
        'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'hr'
    ];
    /**
     * Media HTML tags for rich content
     */
    const MEDIA_ELEMENT_TAGS = [
        'img', 'video', 'audio'
    ];
    /**
     * Element categories for organization
     */
    const ELEMENT_CATEGORIES = {
        FORM: 'form',
        LAYOUT: 'layout',
        CONTENT: 'content',
        MEDIA: 'media'
    };
    /**
     * HTML input type mappings for form controls
     */
    const HTML_INPUT_TYPE_MAP = {
        'text-input': 'text',
        'text': 'text',
        'input-text': 'text',
        'email-input': 'email',
        'email': 'email',
        'password-input': 'password',
        'password': 'password',
        'number-input': 'number',
        'number': 'number',
        'url-input': 'url',
        'url': 'url',
        'tel-input': 'tel',
        'tel': 'tel'
    };
    /**
     * Default placeholders by element type
     */
    const DEFAULT_PLACEHOLDERS = {
        'text': 'Enter text...',
        'text-input': 'Enter text...',
        'input-text': 'Enter text...',
        'email': 'Enter email...',
        'email-input': 'Enter email...',
        'password': 'Enter password...',
        'password-input': 'Enter password...',
        'number': 'Enter number...',
        'number-input': 'Enter number...',
        'url': 'Enter URL...',
        'url-input': 'Enter URL...',
        'tel': 'Enter phone...',
        'tel-input': 'Enter phone...',
        'textarea': 'Enter text...',
        'select': 'Select an option...'
    };
    /**
     * Element Type Utilities Class
     * Provides centralized methods for element type checking and validation
     */
    class ElementTypeUtils {
        /**
         * Check if element htmlTag is a form control that supports user input
         */
        static isFormControl(htmlTag) {
            return FORM_CONTROL_TAGS.includes(htmlTag);
        }
        /**
         * Check if element htmlTag is a layout element
         */
        static isLayoutElement(htmlTag) {
            return LAYOUT_ELEMENT_TAGS.includes(htmlTag);
        }
        /**
         * Check if element htmlTag is a content element
         */
        static isContentElement(htmlTag) {
            return CONTENT_ELEMENT_TAGS.includes(htmlTag);
        }
        /**
         * Check if element htmlTag is a media element
         */
        static isMediaElement(htmlTag) {
            return MEDIA_ELEMENT_TAGS.includes(htmlTag);
        }
        /**
         * Check if element type supports meta labels
         */
        static supportsMetaLabel(fieldType) {
            return ElementTypeUtils.isFormControl(fieldType);
        }
        /**
         * Check if element type supports validation
         */
        static supportsValidation(fieldType) {
            return ElementTypeUtils.isFormControl(fieldType) && fieldType !== 'button';
        }
        /**
         * Check if element type supports placeholder text
         */
        static supportsPlaceholder(fieldType) {
            const placeholderSupported = [
                'text', 'text-input', 'input-text',
                'email', 'email-input',
                'password', 'password-input',
                'number', 'number-input',
                'url', 'url-input',
                'tel', 'tel-input',
                'textarea'
            ];
            return placeholderSupported.includes(fieldType);
        }
        /**
         * Check if element type supports options (select, radio, checkbox groups)
         */
        static supportsOptions(fieldType) {
            return ['select', 'radio', 'radio-group', 'checkbox-group'].includes(fieldType);
        }
        /**
         * Get HTML input type for a form control
         */
        static getHtmlInputType(fieldType) {
            return HTML_INPUT_TYPE_MAP[fieldType] || 'text';
        }
        /**
         * Get default placeholder for an element type
         */
        static getDefaultPlaceholder(fieldType) {
            return DEFAULT_PLACEHOLDERS[fieldType] || '';
        }
        /**
         * Get element category for an element type
         */
        static getElementCategory(elementType) {
            if (ElementTypeUtils.isFormControl(elementType))
                return ELEMENT_CATEGORIES.FORM;
            if (ElementTypeUtils.isLayoutElement(elementType))
                return ELEMENT_CATEGORIES.LAYOUT;
            if (ElementTypeUtils.isContentElement(elementType))
                return ELEMENT_CATEGORIES.CONTENT;
            if (ElementTypeUtils.isMediaElement(elementType))
                return ELEMENT_CATEGORIES.MEDIA;
            return 'other';
        }
        /**
         * Validate if element type is known/supported
         */
        static isValidElementType(elementType) {
            return ElementTypeUtils.isFormControl(elementType) ||
                ElementTypeUtils.isLayoutElement(elementType) ||
                ElementTypeUtils.isContentElement(elementType) ||
                ElementTypeUtils.isMediaElement(elementType);
        }
        /**
         * Get all form control HTML tags
         */
        static getAllFormControlTags() {
            return FORM_CONTROL_TAGS;
        }
        /**
         * Get all layout element HTML tags
         */
        static getAllLayoutElementTags() {
            return LAYOUT_ELEMENT_TAGS;
        }
        /**
         * Check if element requires a name attribute (for form submission)
         */
        static requiresNameAttribute(htmlTag) {
            return ElementTypeUtils.isFormControl(htmlTag) && htmlTag !== 'button';
        }
        /**
         * Check if element can be made required
         */
        static canBeRequired(fieldType) {
            return ElementTypeUtils.supportsValidation(fieldType);
        }
    }

    /**
     * PreviewRenderer - Generates HTML for live preview in FormBuilder
     * Shows meta.label above form controls for better visualization
     */
    class PreviewRenderer extends BaseRenderer {
        renderField(field, options = {}) {
            const { includeLabels = true, includeWrapper = true } = options;
            let html = '';
            // Wrapper start
            if (includeWrapper) {
                html += '<div class="preview-field">\n';
            }
            // Show meta.label for form controls (if available)
            if (includeLabels && field.meta?.label && this.isFormControl(field.htmlTag)) {
                const isRequired = field.properties.required;
                html += `  <div class="field-preview-label">`;
                html += this.escapeHtml(field.meta.label);
                if (isRequired) {
                    html += ' <span class="required">*</span>';
                }
                html += '</div>\n';
            }
            // Field rendering based on type
            switch (field.htmlTag) {
                // Content elements - render as <htmlTag>innerHTML</htmlTag>
                case 'h1':
                case 'h2':
                case 'h3':
                case 'h4':
                case 'h5':
                case 'h6':
                case 'p':
                case 'span':
                case 'pre':
                case 'code':
                case 'blockquote':
                case 'div':
                    const contentText = field.meta?.innerHTML || `${field.htmlTag.toUpperCase()} Content`;
                    html += `  <${field.htmlTag} class="field-preview-content">${this.escapeHtml(contentText)}</${field.htmlTag}>\n`;
                    break;
                case 'hr':
                    html += `  <hr class="field-preview-content" />\n`;
                    break;
                // Media elements
                case 'img':
                    const imgSrc = field.properties?.src || 'https://via.placeholder.com/300x200';
                    const imgAlt = field.properties?.alt || 'Image';
                    html += `  <img src="${this.escapeHtml(imgSrc)}" alt="${this.escapeHtml(imgAlt)}" class="field-preview-media" style="max-width: 100%; height: auto;" />\n`;
                    break;
                case 'video':
                    const videoSrc = field.properties?.src || '';
                    if (videoSrc) {
                        html += `  <video controls class="field-preview-media" style="max-width: 100%; height: auto;">\n`;
                        html += `    <source src="${this.escapeHtml(videoSrc)}" />\n`;
                        html += `    Your browser does not support the video tag.\n`;
                        html += `  </video>\n`;
                    }
                    else {
                        html += `  <div class="field-preview-placeholder">🎥 Video (no source specified)</div>\n`;
                    }
                    break;
                case 'audio':
                    const audioSrc = field.properties?.src || '';
                    if (audioSrc) {
                        html += `  <audio controls class="field-preview-media">\n`;
                        html += `    <source src="${this.escapeHtml(audioSrc)}" />\n`;
                        html += `    Your browser does not support the audio tag.\n`;
                        html += `  </audio>\n`;
                    }
                    else {
                        html += `  <div class="field-preview-placeholder">🎵 Audio (no source specified)</div>\n`;
                    }
                    break;
                case 'input':
                    switch (field.properties.type) {
                        case 'text':
                        case 'email':
                        case 'password':
                        case 'number':
                        case 'url':
                        case 'tel':
                            html += `  <input type="${field.properties.type}" class="field-preview-input" placeholder="${field.properties.placeholder || ''}" disabled />\n`;
                            break;
                        case 'radio':
                            const radioOptions = this.parseSelectOptions(field.properties?.options || '');
                            if (radioOptions.length > 0) {
                                html += '  <div class="field-preview-radio-group">\n';
                                for (let i = 0; i < radioOptions.length; i++) {
                                    const option = radioOptions[i];
                                    if (option) {
                                        html += `    <label class="field-preview-radio"><input type="radio" name="${field.properties.name || field.id}_preview" disabled /> ${this.escapeHtml(option.label)}</label>\n`;
                                    }
                                }
                                html += '  </div>\n';
                            }
                            else {
                                html += '  <div class="field-preview-radio-group">\n';
                                html += '    <label class="field-preview-radio"><input type="radio" disabled /> Option 1</label>\n';
                                html += '  </div>\n';
                            }
                            break;
                        case 'submit':
                        case 'reset':
                            const buttonLabel = field.meta.label || field.properties.value || field.properties.type.charAt(0).toUpperCase() + field.properties.type.slice(1);
                            html += `  <input type="${field.properties.type}" class="field-preview-button field-preview-button-secondary" value="${this.escapeHtml(buttonLabel)}" disabled />\n`;
                            break;
                        default:
                            html += `  <div class="field-preview-placeholder">🔧 ${field.htmlTag} = ${field.properties.type}</div>\n`;
                    }
                    break;
                case 'button':
                    const buttonLabel = field.meta.label || field.properties.label || 'Button';
                    const buttonType = field.properties.type || 'button';
                    let buttonClass = 'field-preview-button';
                    switch (field.properties.type) {
                        case 'button':
                        case 'submit':
                            buttonClass += ' field-preview-button-secondary';
                            html += `  <button type="${buttonType}" class="${buttonClass}" disabled>${this.escapeHtml(buttonLabel)}</button>\n`;
                            break;
                        case 'reset':
                            buttonClass += ' field-preview-button-secondary';
                            html += `  <button type="${buttonType}" class="${buttonClass}" disabled>${this.escapeHtml(buttonLabel)}</button>\n`;
                            break;
                        default:
                            html += `  <div class="field-preview-placeholder">🔧 ${field.htmlTag} = ${field.properties.type}</div>\n`;
                    }
                    break;
                case 'textarea':
                    html += `  <textarea class="field-preview-textarea" placeholder="${field.properties.placeholder || ''}" disabled></textarea>\n`;
                    break;
                case 'select':
                    html += `  <select class="field-preview-select" disabled>\n`;
                    const selectOptions = this.parseSelectOptions(field.properties?.options || '');
                    if (selectOptions.length === 0) {
                        html += `    <option value="">Select an option...</option>\n`;
                    }
                    else {
                        for (const option of selectOptions) {
                            html += `    <option value="${this.escapeHtml(option.value)}">${this.escapeHtml(option.label)}</option>\n`;
                        }
                    }
                    html += '  </select>\n';
                    break;
                case 'checkbox':
                    const checkboxLabel = field.meta.label || field.properties.label || 'Checkbox';
                    html += `  <label class="field-preview-checkbox"><input type="checkbox" disabled /> ${this.escapeHtml(checkboxLabel)}</label>\n`;
                    break;
                default:
                    html += `  <div class="field-preview-placeholder">🔧 ${field.htmlTag}</div>\n`;
            }
            // Helper text
            if (field.meta && field.meta.helperText) {
                html += `  <div class="preview-help">${this.escapeHtml(field.meta.helperText)}</div>\n`;
            }
            // Wrapper end
            if (includeWrapper) {
                html += '</div>\n';
            }
            return html;
        }
        renderColumn(column, options = {}) {
            const width = column.width || 12;
            let html = `<div class="preview-column" data-width="${width}">\n`;
            if (column.fields && Array.isArray(column.fields)) {
                for (const field of column.fields) {
                    html += this.renderField(field, options);
                }
            }
            // Show placeholder if empty
            if (!column.fields || column.fields.length === 0) {
                html += '  <div class="preview-column-placeholder">Drop fields here</div>\n';
            }
            html += '</div>\n';
            return html;
        }
        renderRow(row, options = {}) {
            let html = '<div class="preview-row">\n';
            if (row.columns && Array.isArray(row.columns)) {
                for (const column of row.columns) {
                    html += this.renderColumn(column, options);
                }
            }
            // Show placeholder if empty
            if (!row.columns || row.columns.length === 0) {
                html += '  <div class="preview-row-placeholder">Drop columns here</div>\n';
            }
            html += '</div>\n';
            return html;
        }
        renderForm(rows, options = {}) {
            let html = '<div class="preview-form">\n';
            if (rows.length === 0) {
                html += '  <div class="preview-empty">\n';
                html += '    <div class="preview-empty-icon">📝</div>\n';
                html += '    <div class="preview-empty-text">Start building your form</div>\n';
                html += '    <div class="preview-empty-hint">Drag elements from the toolbox to create your form</div>\n';
                html += '  </div>\n';
            }
            else {
                for (const row of rows) {
                    html += this.renderRow(row, options);
                }
            }
            html += '</div>\n';
            return html;
        }
        renderPreview(rows, options = {}) {
            return this.renderForm(rows, options);
        }
        isFormControl(fieldType) {
            return ElementTypeUtils.isFormControl(fieldType);
        }
        parseSelectOptions(optionsText) {
            if (!optionsText)
                return [];
            return optionsText.split('\n')
                .filter(line => line.trim())
                .map(line => {
                const trimmed = line.trim();
                // Support "label|value" format or just "label"
                if (trimmed.includes('|')) {
                    const [label, value] = trimmed.split('|', 2);
                    return { label: label?.trim() || '', value: value?.trim() || '' };
                }
                else {
                    return { label: trimmed, value: trimmed };
                }
            });
        }
    }

    /**
     * Event Type Utilities
     * Centralized management of DOM events and event handling
     */
    /**
     * Custom FormBuilder event types
     */
    const FORM_BUILDER_EVENTS = {
        FORM_BUILDER_LOADED: 'formbuilder:loaded',
        ELEMENT_SELECTED: 'element:selected',
        ELEMENT_DESELECTED: 'element:deselected',
        ELEMENT_CREATED: 'element:created',
        ELEMENT_DELETED: 'element:deleted',
        ELEMENT_MOVED: 'element:moved',
        ELEMENT_UPDATED: 'element:updated',
        PROPERTY_CHANGED: 'property:changed',
        FORM_CHANGED: 'form:changed',
        FORM_EXPORTED: 'form:exported',
        FORM_IMPORTED: 'form:imported',
        FORM_CLEARED: 'form:cleared',
        CATEGORY_TOGGLED: 'category:toggled',
        PREVIEW_UPDATED: 'preview:updated',
        JSON_DATA_READY: 'json:data:ready'
    };

    /**
     * Basic HTML renderer for simple form output
     */
    class BasicRenderer extends BaseRenderer {
        renderField(field, options = {}) {
            const { includeLabels = true } = options;
            const fieldId = this.getFieldId(field);
            this.getFieldName(field);
            const label = this.getFieldLabel(field);
            let html = '';
            // Add label if enabled and exists
            if (includeLabels && label) {
                html += `<label for="${fieldId}">${this.escapeHtml(label)}</label>\n`;
            }
            // Generate field based on type
            switch (field.htmlTag) {
                case 'input':
                    html += this.renderInput(field);
                    break;
                case 'textarea':
                    html += this.renderTextarea(field);
                    break;
                case 'select':
                    html += this.renderSelect(field);
                    break;
                case 'button':
                    html += this.renderButton(field);
                    break;
                case 'checkbox':
                    html += this.renderCheckbox(field);
                    break;
                case 'h1':
                case 'h2':
                case 'h3':
                case 'h4':
                case 'h5':
                case 'h6':
                    html += this.renderHeading(field);
                    break;
                case 'p':
                    html += this.renderParagraph(field);
                    break;
                case 'div':
                    html += this.renderDiv(field);
                    break;
                case 'span':
                    html += this.renderSpan(field);
                    break;
                case 'a':
                    html += this.renderLink(field);
                    break;
                case 'pre':
                    html += this.renderPreformatted(field);
                    break;
                case 'code':
                    html += this.renderCode(field);
                    break;
                case 'hr':
                    html += this.renderHorizontalRule(field);
                    break;
                case 'br':
                    html += this.renderLineBreak(field);
                    break;
                case 'img':
                    html += this.renderImage(field);
                    break;
                default:
                    console.log(`BasicRenderer: Unknown field type: ${field.htmlTag}`);
                    html += `<!-- Unknown field type: ${field.htmlTag} -->`;
            }
            return html;
        }
        renderInput(field) {
            const type = field.properties?.type || 'text';
            const attributes = {
                type: type,
                id: this.getFieldId(field),
                name: this.getFieldName(field),
                placeholder: field.properties?.placeholder || '',
                value: field.properties?.value || '',
                required: field.properties?.required ? 'required' : undefined,
                maxlength: field.properties?.maxLength || undefined,
                minlength: field.properties?.minLength || undefined,
                min: field.properties?.min || undefined,
                max: field.properties?.max || undefined,
                step: field.properties?.step || undefined,
                pattern: field.properties?.pattern || undefined,
                class: field.properties?.class || undefined,
                style: field.properties?.style || undefined,
                checked: field.properties?.checked ? 'checked' : undefined,
                multiple: field.properties?.multiple ? 'multiple' : undefined,
                accept: field.properties?.accept || undefined
            };
            return `<input ${this.formatAttributes(attributes)} />`;
        }
        renderTextInput(field) {
            const attributes = {
                type: field.properties?.type || 'text',
                id: this.getFieldId(field),
                name: this.getFieldName(field),
                placeholder: field.properties?.placeholder || '',
                value: field.properties?.value || '',
                required: field.properties?.required ? 'required' : undefined,
                maxlength: field.properties?.maxLength || undefined
            };
            return `<input ${this.formatAttributes(attributes)} />`;
        }
        renderEmailInput(field) {
            const attributes = {
                type: 'email',
                id: this.getFieldId(field),
                name: this.getFieldName(field),
                placeholder: field.properties?.placeholder || '',
                value: field.properties?.value || '',
                required: field.properties?.required ? 'required' : undefined
            };
            return `<input ${this.formatAttributes(attributes)} />`;
        }
        renderPasswordInput(field) {
            const attributes = {
                type: 'password',
                id: this.getFieldId(field),
                name: this.getFieldName(field),
                placeholder: field.properties?.placeholder || '',
                required: field.properties?.required ? 'required' : undefined
            };
            return `<input ${this.formatAttributes(attributes)} />`;
        }
        renderNumberInput(field) {
            const attributes = {
                type: 'number',
                id: this.getFieldId(field),
                name: this.getFieldName(field),
                placeholder: field.properties?.placeholder || '',
                value: field.properties?.value || '',
                min: field.properties?.min || undefined,
                max: field.properties?.max || undefined,
                required: field.properties?.required ? 'required' : undefined
            };
            return `<input ${this.formatAttributes(attributes)} />`;
        }
        renderTextarea(field) {
            const attributes = {
                id: this.getFieldId(field),
                name: this.getFieldName(field),
                placeholder: field.properties?.placeholder || '',
                rows: field.properties?.rows || 4,
                required: field.properties?.required ? 'required' : undefined
            };
            const value = this.escapeHtml(field.properties?.value || '');
            return `<textarea ${this.formatAttributes(attributes)}>${value}</textarea>`;
        }
        renderSelect(field) {
            const attributes = {
                id: this.getFieldId(field),
                name: this.getFieldName(field),
                required: field.properties?.required ? 'required' : undefined,
                multiple: field.properties?.multiple ? 'multiple' : undefined
            };
            let html = `<select ${this.formatAttributes(attributes)}>\n`;
            // Parse options from textarea format or array
            const options = this.parseSelectOptions(field.properties?.options || '');
            options.forEach(option => {
                const selected = option.value === field.properties?.value ? 'selected' : '';
                html += `  <option value="${this.escapeHtml(option.value)}" ${selected}>${this.escapeHtml(option.label)}</option>\n`;
            });
            html += '</select>';
            return html;
        }
        renderCheckbox(field) {
            const attributes = {
                type: 'checkbox',
                id: this.getFieldId(field),
                name: this.getFieldName(field),
                value: field.properties?.value || '1',
                checked: field.properties?.checked ? 'checked' : undefined
            };
            return `<input ${this.formatAttributes(attributes)} />`;
        }
        renderRadio(field) {
            const attributes = {
                type: 'radio',
                id: this.getFieldId(field),
                name: this.getFieldName(field),
                value: field.properties?.value || '',
                checked: field.properties?.checked ? 'checked' : undefined
            };
            return `<input ${this.formatAttributes(attributes)} />`;
        }
        renderButton(field) {
            const attributes = {
                type: field.properties?.type || 'button',
                id: this.getFieldId(field),
                name: this.getFieldName(field)
            };
            const label = this.getFieldLabel(field) || field.properties?.value || 'Button';
            return `<button ${this.formatAttributes(attributes)}>${this.escapeHtml(label)}</button>`;
        }
        renderHeading(field) {
            const attributes = {
                id: this.getFieldId(field),
                class: field.properties?.class || undefined,
                style: field.properties?.style || undefined
            };
            const innerHTML = field.meta?.innerHTML || field.meta?.label || 'Heading';
            const tag = field.htmlTag || 'h1';
            return `<${tag} ${this.formatAttributes(attributes)}>${this.escapeHtml(innerHTML)}</${tag}>`;
        }
        renderParagraph(field) {
            const attributes = {
                id: this.getFieldId(field),
                class: field.properties?.class || undefined,
                style: field.properties?.style || undefined
            };
            const innerHTML = field.meta?.innerHTML || field.meta?.label || 'Paragraph text';
            return `<p ${this.formatAttributes(attributes)}>${this.escapeHtml(innerHTML)}</p>`;
        }
        renderDiv(field) {
            const attributes = {
                id: this.getFieldId(field),
                class: field.properties?.class || undefined,
                style: field.properties?.style || undefined
            };
            const innerHTML = field.meta?.innerHTML || field.meta?.label || '';
            return `<div ${this.formatAttributes(attributes)}>${this.escapeHtml(innerHTML)}</div>`;
        }
        renderSpan(field) {
            const attributes = {
                id: this.getFieldId(field),
                class: field.properties?.class || undefined,
                style: field.properties?.style || undefined
            };
            const innerHTML = field.meta?.innerHTML || field.meta?.label || '';
            return `<span ${this.formatAttributes(attributes)}>${this.escapeHtml(innerHTML)}</span>`;
        }
        renderLink(field) {
            const attributes = {
                id: this.getFieldId(field),
                href: field.properties?.href || '#',
                target: field.properties?.target || undefined,
                class: field.properties?.class || undefined,
                style: field.properties?.style || undefined
            };
            const innerHTML = field.meta?.innerHTML || field.meta?.label || 'Link';
            return `<a ${this.formatAttributes(attributes)}>${this.escapeHtml(innerHTML)}</a>`;
        }
        renderPreformatted(field) {
            const attributes = {
                id: this.getFieldId(field),
                class: field.properties?.class || undefined,
                style: field.properties?.style || undefined
            };
            const innerHTML = field.meta?.innerHTML || field.meta?.label || '';
            return `<pre ${this.formatAttributes(attributes)}>${this.escapeHtml(innerHTML)}</pre>`;
        }
        renderCode(field) {
            const attributes = {
                id: this.getFieldId(field),
                class: field.properties?.class || undefined,
                style: field.properties?.style || undefined
            };
            const innerHTML = field.meta?.innerHTML || field.meta?.label || '';
            return `<code ${this.formatAttributes(attributes)}>${this.escapeHtml(innerHTML)}</code>`;
        }
        renderHorizontalRule(field) {
            const attributes = {
                id: this.getFieldId(field),
                class: field.properties?.class || undefined,
                style: field.properties?.style || undefined
            };
            return `<hr ${this.formatAttributes(attributes)} />`;
        }
        renderLineBreak(field) {
            const attributes = {
                id: this.getFieldId(field),
                class: field.properties?.class || undefined
            };
            return `<br ${this.formatAttributes(attributes)} />`;
        }
        renderImage(field) {
            const attributes = {
                id: this.getFieldId(field),
                src: field.properties?.src || '',
                alt: field.properties?.alt || '',
                width: field.properties?.width || undefined,
                height: field.properties?.height || undefined,
                title: field.properties?.title || undefined,
                loading: field.properties?.loading || undefined,
                decoding: field.properties?.decoding || undefined,
                crossorigin: field.properties?.crossorigin || undefined,
                referrerpolicy: field.properties?.referrerpolicy || undefined,
                sizes: field.properties?.sizes || undefined,
                srcset: field.properties?.srcset || undefined,
                class: field.properties?.class || undefined,
                style: field.properties?.style || undefined
            };
            return `<img ${this.formatAttributes(attributes)} />`;
        }
        parseSelectOptions(optionsText) {
            if (!optionsText)
                return [];
            return optionsText.split('\n')
                .filter(line => line.trim())
                .map(line => {
                const trimmed = line.trim();
                // Support "label|value" format or just "label"
                if (trimmed.includes('|')) {
                    const [label, value] = trimmed.split('|', 2);
                    return { label: label?.trim() || '', value: value?.trim() || '' };
                }
                else {
                    return { label: trimmed, value: trimmed };
                }
            });
        }
        renderColumn(column, options = {}) {
            const { includeWrapper = true } = options;
            let html = '';
            if (includeWrapper) {
                html += `<div class="column" data-width="${column.width}">\n`;
            }
            column.fields.forEach(field => {
                html += `  <div class="field">\n`;
                html += `    ${this.renderField(field, options)}\n`;
                html += `  </div>\n`;
            });
            if (includeWrapper) {
                html += '</div>\n';
            }
            return html;
        }
        renderRow(row, options = {}) {
            const { includeWrapper = true } = options;
            let html = '';
            if (includeWrapper) {
                html += `<div class="row" id="${row.id}">\n`;
            }
            row.columns.forEach(column => {
                html += this.renderColumn(column, options);
            });
            if (includeWrapper) {
                html += '</div>\n';
            }
            return html;
        }
        renderForm(rows, options = {}) {
            const { formId = 'generated-form', formAction = '', formMethod = 'POST', cssFile = 'basic.css' } = options;
            let html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Generated Form</title>
    <link rel="stylesheet" href="${cssFile}">
</head>
<body>
    <form id="${formId}" action="${formAction}" method="${formMethod}">
`;
            rows.forEach(row => {
                html += this.renderRow(row, options);
            });
            html += `    </form>
</body>
</html>`;
            return html;
        }
        renderPreview(rows, options = {}) {
            const { cssFile = 'preview.css' } = options;
            let html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Form Preview</title>
    <link rel="stylesheet" href="${cssFile}">
</head>
<body>
    <div class="preview-container">
        <h2>Form Preview</h2>
        <div class="preview-form">
`;
            rows.forEach(row => {
                html += this.renderRow(row, { ...options, includeWrapper: true });
            });
            html += `        </div>
    </div>
</body>
</html>`;
            return html;
        }
    }

    /**
     * Bootstrap HTML renderer for styled form output
     */
    class BootstrapRenderer extends BaseRenderer {
        renderField(field, options = {}) {
            const { includeLabels = true } = options;
            const fieldId = this.getFieldId(field);
            const label = this.getFieldLabel(field);
            let html = '';
            // Bootstrap form group wrapper
            html += '<div class="mb-3">\n';
            // Add label if enabled and exists
            if (includeLabels && label) {
                const requiredMark = field.properties?.required ? ' <span class="text-danger">*</span>' : '';
                html += `  <label for="${fieldId}" class="form-label">${this.escapeHtml(label)}${requiredMark}</label>\n`;
            }
            // Generate field based on htmlTag and type
            switch (field.htmlTag) {
                case 'input':
                    switch (field.properties.type) {
                        case 'text':
                        case 'email':
                        case 'password':
                        case 'number':
                        case 'url':
                        case 'tel':
                            html += `  ${this.renderTextInput(field)}\n`;
                            break;
                        case 'radio':
                            html += `  ${this.renderRadio(field)}\n`;
                            break;
                        case 'submit':
                        case 'reset':
                            html += `  ${this.renderButton(field)}\n`;
                            break;
                        default:
                            html += `  <!-- Unknown input type: ${field.properties.type} -->\n`;
                    }
                    break;
                case 'textarea':
                    html += `  ${this.renderTextarea(field)}\n`;
                    break;
                case 'select':
                    html += `  ${this.renderSelect(field)}\n`;
                    break;
                case 'checkbox':
                    html += `  ${this.renderCheckbox(field)}\n`;
                    break;
                case 'button':
                    html += `  ${this.renderButton(field)}\n`;
                    break;
                case 'h1':
                case 'h2':
                case 'h3':
                case 'h4':
                case 'h5':
                case 'h6':
                    html += `  ${this.renderHeading(field)}\n`;
                    break;
                case 'p':
                    html += `  ${this.renderParagraph(field)}\n`;
                    break;
                case 'div':
                    html += `  ${this.renderDiv(field)}\n`;
                    break;
                case 'span':
                    html += `  ${this.renderSpan(field)}\n`;
                    break;
                case 'a':
                    html += `  ${this.renderLink(field)}\n`;
                    break;
                case 'pre':
                    html += `  ${this.renderPreformatted(field)}\n`;
                    break;
                case 'code':
                    html += `  ${this.renderCode(field)}\n`;
                    break;
                case 'hr':
                    html += `  ${this.renderHorizontalRule(field)}\n`;
                    break;
                case 'br':
                    html += `  ${this.renderLineBreak(field)}\n`;
                    break;
                case 'img':
                    html += `  ${this.renderImage(field)}\n`;
                    break;
                default:
                    console.log(`BootstrapRenderer: Unknown field htmlTag: ${field.htmlTag}`);
                    html += `  <!-- Unknown field htmlTag: ${field.htmlTag} -->\n`;
            }
            // Add helper text if exists
            const helperText = field.meta?.helperText || field.meta?.hint;
            if (helperText) {
                html += `  <div class="form-text">${this.escapeHtml(helperText)}</div>\n`;
            }
            html += '</div>\n';
            return html;
        }
        renderTextInput(field) {
            const attributes = {
                type: field.properties?.type || 'text',
                class: 'form-control',
                id: this.getFieldId(field),
                name: this.getFieldName(field),
                placeholder: field.properties?.placeholder || '',
                value: field.properties?.value || '',
                required: field.properties?.required ? 'required' : undefined,
                maxlength: field.properties?.maxLength || undefined
            };
            return `<input ${this.formatAttributes(attributes)} />`;
        }
        renderTextarea(field) {
            const attributes = {
                class: 'form-control',
                id: this.getFieldId(field),
                name: this.getFieldName(field),
                placeholder: field.properties?.placeholder || '',
                rows: field.properties?.rows || 4,
                required: field.properties?.required ? 'required' : undefined
            };
            const value = this.escapeHtml(field.properties?.value || '');
            return `<textarea ${this.formatAttributes(attributes)}>${value}</textarea>`;
        }
        renderSelect(field) {
            const attributes = {
                class: 'form-select',
                id: this.getFieldId(field),
                name: this.getFieldName(field),
                required: field.properties?.required ? 'required' : undefined,
                multiple: field.properties?.multiple ? 'multiple' : undefined
            };
            let html = `<select ${this.formatAttributes(attributes)}>\n`;
            // Add default option if not required
            if (!field.properties?.required) {
                html += `    <option value="">Choose...</option>\n`;
            }
            // Parse options from textarea format or array
            const options = this.parseSelectOptions(field.properties?.options || '');
            options.forEach(option => {
                const selected = option.value === field.properties?.value ? 'selected' : '';
                html += `    <option value="${this.escapeHtml(option.value)}" ${selected}>${this.escapeHtml(option.label)}</option>\n`;
            });
            html += '  </select>';
            return html;
        }
        renderCheckbox(field) {
            const fieldId = this.getFieldId(field);
            const label = this.getFieldLabel(field);
            const attributes = {
                type: 'checkbox',
                class: 'form-check-input',
                id: fieldId,
                name: this.getFieldName(field),
                value: field.properties?.value || '1',
                checked: field.properties?.checked ? 'checked' : undefined
            };
            let html = '<div class="form-check">\n';
            html += `    <input ${this.formatAttributes(attributes)} />\n`;
            if (label) {
                html += `    <label class="form-check-label" for="${fieldId}">${this.escapeHtml(label)}</label>\n`;
            }
            html += '  </div>';
            return html;
        }
        renderRadio(field) {
            const fieldId = this.getFieldId(field);
            const label = this.getFieldLabel(field);
            const attributes = {
                type: 'radio',
                class: 'form-check-input',
                id: fieldId,
                name: this.getFieldName(field),
                value: field.properties?.value || '',
                checked: field.properties?.checked ? 'checked' : undefined
            };
            let html = '<div class="form-check">\n';
            html += `    <input ${this.formatAttributes(attributes)} />\n`;
            if (label) {
                html += `    <label class="form-check-label" for="${fieldId}">${this.escapeHtml(label)}</label>\n`;
            }
            html += '  </div>';
            return html;
        }
        renderButton(field) {
            const attributes = {
                type: field.properties?.type || 'button',
                class: 'btn btn-primary',
                id: this.getFieldId(field),
                name: this.getFieldName(field)
            };
            const label = this.getFieldLabel(field) || field.properties?.value || 'Button';
            return `<button ${this.formatAttributes(attributes)}>${this.escapeHtml(label)}</button>`;
        }
        parseSelectOptions(optionsText) {
            if (!optionsText)
                return [];
            return optionsText.split('\n')
                .filter(line => line.trim())
                .map(line => {
                const trimmed = line.trim();
                if (trimmed.includes('|')) {
                    const [label, value] = trimmed.split('|', 2);
                    return { label: label?.trim() || '', value: value?.trim() || '' };
                }
                else {
                    return { label: trimmed, value: trimmed };
                }
            });
        }
        renderHeading(field) {
            const innerHTML = field.meta?.innerHTML || field.meta?.label || 'Heading';
            const tag = field.htmlTag || 'h1';
            const attributes = {
                id: this.getFieldId(field),
                class: field.properties?.class || undefined,
                style: field.properties?.style || undefined
            };
            return `<${tag} ${this.formatAttributes(attributes)}>${this.escapeHtml(innerHTML)}</${tag}>`;
        }
        renderParagraph(field) {
            const innerHTML = field.meta?.innerHTML || field.meta?.label || 'Paragraph text';
            const attributes = {
                id: this.getFieldId(field),
                class: field.properties?.class || undefined,
                style: field.properties?.style || undefined
            };
            return `<p ${this.formatAttributes(attributes)}>${this.escapeHtml(innerHTML)}</p>`;
        }
        renderDiv(field) {
            const innerHTML = field.meta?.innerHTML || field.meta?.label || '';
            const attributes = {
                id: this.getFieldId(field),
                class: field.properties?.class || undefined,
                style: field.properties?.style || undefined
            };
            return `<div ${this.formatAttributes(attributes)}>${this.escapeHtml(innerHTML)}</div>`;
        }
        renderSpan(field) {
            const innerHTML = field.meta?.innerHTML || field.meta?.label || '';
            const attributes = {
                id: this.getFieldId(field),
                class: field.properties?.class || undefined,
                style: field.properties?.style || undefined
            };
            return `<span ${this.formatAttributes(attributes)}>${this.escapeHtml(innerHTML)}</span>`;
        }
        renderLink(field) {
            const innerHTML = field.meta?.innerHTML || field.meta?.label || 'Link';
            const attributes = {
                id: this.getFieldId(field),
                href: field.properties?.href || '#',
                target: field.properties?.target || undefined,
                class: field.properties?.class || undefined,
                style: field.properties?.style || undefined
            };
            return `<a ${this.formatAttributes(attributes)}>${this.escapeHtml(innerHTML)}</a>`;
        }
        renderPreformatted(field) {
            const innerHTML = field.meta?.innerHTML || field.meta?.label || '';
            const attributes = {
                id: this.getFieldId(field),
                class: field.properties?.class || undefined,
                style: field.properties?.style || undefined
            };
            return `<pre ${this.formatAttributes(attributes)}>${this.escapeHtml(innerHTML)}</pre>`;
        }
        renderCode(field) {
            const innerHTML = field.meta?.innerHTML || field.meta?.label || '';
            const attributes = {
                id: this.getFieldId(field),
                class: field.properties?.class || 'language-javascript',
                style: field.properties?.style || undefined
            };
            return `<code ${this.formatAttributes(attributes)}>${this.escapeHtml(innerHTML)}</code>`;
        }
        renderHorizontalRule(field) {
            const attributes = {
                id: this.getFieldId(field),
                class: field.properties?.class || undefined,
                style: field.properties?.style || undefined
            };
            return `<hr ${this.formatAttributes(attributes)} />`;
        }
        renderLineBreak(field) {
            const attributes = {
                id: this.getFieldId(field),
                class: field.properties?.class || undefined
            };
            return `<br ${this.formatAttributes(attributes)} />`;
        }
        renderImage(field) {
            const attributes = {
                id: this.getFieldId(field),
                src: field.properties?.src || '',
                alt: field.properties?.alt || '',
                class: field.properties?.class || 'img-fluid',
                width: field.properties?.width || undefined,
                height: field.properties?.height || undefined,
                title: field.properties?.title || undefined,
                loading: field.properties?.loading || undefined,
                decoding: field.properties?.decoding || undefined,
                crossorigin: field.properties?.crossorigin || undefined,
                referrerpolicy: field.properties?.referrerpolicy || undefined,
                sizes: field.properties?.sizes || undefined,
                srcset: field.properties?.srcset || undefined,
                style: field.properties?.style || undefined
            };
            return `<img ${this.formatAttributes(attributes)} />`;
        }
        renderColumn(column, options = {}) {
            const { includeWrapper = true } = options;
            let html = '';
            if (includeWrapper) {
                // Bootstrap grid system
                const colClass = `col-md-${column.width}`;
                html += `<div class="${colClass}">\n`;
            }
            column.fields.forEach(field => {
                html += this.renderField(field, options);
            });
            if (includeWrapper) {
                html += '</div>\n';
            }
            return html;
        }
        renderRow(row, options = {}) {
            const { includeWrapper = true } = options;
            let html = '';
            if (includeWrapper) {
                html += `<div class="row" id="${row.id}">\n`;
            }
            row.columns.forEach(column => {
                html += this.renderColumn(column, options);
            });
            if (includeWrapper) {
                html += '</div>\n';
            }
            return html;
        }
        renderForm(rows, options = {}) {
            const { formId = 'generated-form', formAction = '', formMethod = 'POST' } = options;
            let html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Generated Form</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
    <div class="container mt-4">
        <form id="${formId}" action="${formAction}" method="${formMethod}">
`;
            rows.forEach(row => {
                html += `            ${this.renderRow(row, options)}`;
            });
            html += `        </form>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>`;
            return html;
        }
        renderPreview(rows, options = {}) {
            let html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Form Preview - Bootstrap</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
    <div class="container mt-4">
        <div class="card">
            <div class="card-header">
                <h2 class="card-title mb-0">Form Preview</h2>
            </div>
            <div class="card-body">
`;
            rows.forEach(row => {
                html += `                ${this.renderRow(row, { ...options, includeWrapper: true })}`;
            });
            html += `            </div>
        </div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>`;
            return html;
        }
    }

    /**
     * TailwindRenderer - Generates HTML with Tailwind CSS classes
     * Uses Tailwind utility classes for modern, responsive design
     */
    class TailwindRenderer extends BaseRenderer {
        renderField(field, options = {}) {
            const { includeLabels = true, includeWrapper = true } = options;
            const attributes = this.formatAttributes(field.properties);
            const baseClasses = 'block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm';
            let html = '';
            // Wrapper start
            if (includeWrapper) {
                html += '<div class="mb-4">\n';
            }
            // Label
            if (includeLabels && field.meta.label) {
                const isRequired = field.properties.required;
                const labelClass = 'block text-sm font-medium text-gray-700 mb-1';
                html += `  <label for="${field.properties.id}" class="${labelClass}">`;
                html += this.escapeHtml(field.meta.label);
                if (isRequired) {
                    html += ' <span class="text-red-500">*</span>';
                }
                html += '</label>\n';
            }
            // Field rendering based on htmlTag and type
            switch (field.htmlTag) {
                case 'input':
                    switch (field.properties.type) {
                        case 'text':
                        case 'email':
                        case 'password':
                        case 'number':
                        case 'url':
                        case 'tel':
                            html += `  <input type="${field.properties.type}" class="${baseClasses}" ${attributes} />\n`;
                            break;
                        case 'radio':
                            const radioOptions = this.parseSelectOptions(field.properties?.options || '');
                            if (radioOptions.length > 0) {
                                html += '  <div class="space-y-2">\n';
                                for (let i = 0; i < radioOptions.length; i++) {
                                    const option = radioOptions[i];
                                    if (option) {
                                        const radioId = `${field.properties.id}_${i}`;
                                        html += '    <div class="flex items-center">\n';
                                        html += `      <input type="radio" id="${radioId}" name="${field.properties.name}" value="${this.escapeHtml(option.value)}" class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300" />\n`;
                                        html += `      <label for="${radioId}" class="ml-2 block text-sm text-gray-700">${this.escapeHtml(option.label)}</label>\n`;
                                        html += '    </div>\n';
                                    }
                                }
                                html += '  </div>\n';
                            }
                            break;
                        case 'submit':
                        case 'reset':
                            let inputButtonClasses = 'inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2';
                            if (field.properties.type === 'submit') {
                                inputButtonClasses += ' text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-500';
                            }
                            else {
                                inputButtonClasses += ' text-white bg-gray-600 hover:bg-gray-700 focus:ring-gray-500';
                            }
                            const buttonLabel = field.meta.label || field.properties.value || field.properties.type.charAt(0).toUpperCase() + field.properties.type.slice(1);
                            html += `  <input type="${field.properties.type}" class="${inputButtonClasses}" value="${this.escapeHtml(buttonLabel)}" ${attributes} />\n`;
                            break;
                        default:
                            html += `  <!-- Unknown input type: ${field.properties.type} -->\n`;
                    }
                    break;
                case 'textarea':
                    const textareaClasses = 'block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm resize-y';
                    html += `  <textarea class="${textareaClasses}" ${attributes}></textarea>\n`;
                    break;
                case 'select':
                    const selectClasses = 'block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm';
                    html += `  <select class="${selectClasses}" ${attributes}>\n`;
                    const selectOptions = this.parseSelectOptions(field.properties?.options || '');
                    for (const option of selectOptions) {
                        html += `    <option value="${this.escapeHtml(option.value)}">${this.escapeHtml(option.label)}</option>\n`;
                    }
                    html += '  </select>\n';
                    break;
                case 'checkbox':
                    html += '  <div class="flex items-center">\n';
                    html += `    <input type="checkbox" class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" ${attributes} />\n`;
                    if (field.meta.label) {
                        html += `    <label for="${field.properties.id}" class="ml-2 block text-sm text-gray-700">${this.escapeHtml(field.meta.label)}</label>\n`;
                    }
                    html += '  </div>\n';
                    break;
                case 'button':
                    const buttonType = field.properties.type || 'button';
                    let buttonClasses = 'inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2';
                    switch (buttonType) {
                        case 'submit':
                            buttonClasses += ' text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-500';
                            break;
                        case 'reset':
                            buttonClasses += ' text-white bg-gray-600 hover:bg-gray-700 focus:ring-gray-500';
                            break;
                        default:
                            buttonClasses += ' text-gray-700 bg-white hover:bg-gray-50 focus:ring-blue-500 border-gray-300';
                    }
                    html += `  <button type="${buttonType}" class="${buttonClasses}" ${attributes}>${this.escapeHtml(field.meta.label || 'Button')}</button>\n`;
                    break;
                case 'h1':
                case 'h2':
                case 'h3':
                case 'h4':
                case 'h5':
                case 'h6':
                    html += `  ${this.renderHeading(field)}\n`;
                    break;
                case 'p':
                    html += `  ${this.renderParagraph(field)}\n`;
                    break;
                case 'div':
                    html += `  ${this.renderDiv(field)}\n`;
                    break;
                case 'span':
                    html += `  ${this.renderSpan(field)}\n`;
                    break;
                case 'a':
                    html += `  ${this.renderLink(field)}\n`;
                    break;
                case 'pre':
                    html += `  ${this.renderPreformatted(field)}\n`;
                    break;
                case 'code':
                    html += `  ${this.renderCode(field)}\n`;
                    break;
                case 'hr':
                    html += `  ${this.renderHorizontalRule(field)}\n`;
                    break;
                case 'br':
                    html += `  ${this.renderLineBreak(field)}\n`;
                    break;
                case 'img':
                    html += `  ${this.renderImage(field)}\n`;
                    break;
                default:
                    html += `  <!-- Unsupported field htmlTag: ${field.htmlTag} -->\n`;
            }
            // Helper text
            if (field.meta.helperText) {
                html += `  <p class="mt-1 text-sm text-gray-500">${this.escapeHtml(field.meta.helperText)}</p>\n`;
            }
            // Wrapper end
            if (includeWrapper) {
                html += '</div>\n';
            }
            return html;
        }
        renderColumn(column, options = {}) {
            const width = column.width || 12;
            const colClass = this.getTailwindColumnClass(width);
            let html = `<div class="${colClass}">\n`;
            if (column.fields && Array.isArray(column.fields)) {
                for (const field of column.fields) {
                    html += this.renderField(field, options);
                }
            }
            html += '</div>\n';
            return html;
        }
        renderRow(row, options = {}) {
            let html = '<div class="grid grid-cols-12 gap-4 mb-6">\n';
            if (row.columns && Array.isArray(row.columns)) {
                for (const column of row.columns) {
                    html += this.renderColumn(column, options);
                }
            }
            html += '</div>\n';
            return html;
        }
        renderForm(rows, options = {}) {
            const { formId = 'form', formAction = '#', formMethod = 'POST' } = options;
            let html = `<form id="${formId}" action="${formAction}" method="${formMethod}" class="max-w-4xl mx-auto p-6 bg-white">\n`;
            for (const row of rows) {
                html += this.renderRow(row, options);
            }
            html += '</form>\n';
            return html;
        }
        renderPreview(rows, options = {}) {
            return this.generatePreviewHTML(rows, options);
        }
        generateFullHTML(rows, options = {}) {
            const { cssFile } = options;
            const formHTML = this.renderForm(rows, options);
            return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Form - Tailwind CSS</title>
    <script src="https://cdn.tailwindcss.com"></script>
    ${cssFile ? `<link rel="stylesheet" href="${cssFile}">` : ''}
    <style>
        /* Custom Tailwind configuration */
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');
        body { font-family: 'Inter', sans-serif; }
    </style>
</head>
<body class="bg-gray-50 min-h-screen py-8">
    <div class="container mx-auto px-4">
        ${formHTML}
    </div>
</body>
</html>`;
        }
        generatePreviewHTML(rows, options = {}) {
            const formHTML = this.renderForm(rows, options);
            return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Form Preview - Tailwind CSS</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="css/preview.css">
    <style>
        /* Enhanced preview styling with Tailwind */
        body { 
            font-family: 'Inter', sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        .preview-container {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border-radius: 16px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }
    </style>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
</head>
<body class="min-h-screen py-8">
    <div class="container mx-auto px-4">
        <div class="preview-container max-w-4xl mx-auto p-8">
            <div class="text-center mb-8">
                <h1 class="text-3xl font-bold text-gray-800 mb-2">Form Preview</h1>
                <p class="text-gray-600">Powered by Tailwind CSS</p>
            </div>
            ${formHTML}
        </div>
    </div>
</body>
</html>`;
        }
        renderHeading(field) {
            const innerHTML = field.meta?.innerHTML || field.meta?.label || 'Heading';
            const tag = field.htmlTag || 'h1';
            const headingClasses = {
                h1: 'text-3xl font-bold text-gray-900',
                h2: 'text-2xl font-semibold text-gray-900',
                h3: 'text-xl font-semibold text-gray-900',
                h4: 'text-lg font-medium text-gray-900',
                h5: 'text-base font-medium text-gray-900',
                h6: 'text-sm font-medium text-gray-900'
            };
            const attributes = {
                id: this.getFieldId(field),
                class: field.properties?.class || headingClasses[tag] || headingClasses.h1,
                style: field.properties?.style || undefined
            };
            return `<${tag} ${this.formatAttributes(attributes)}>${this.escapeHtml(innerHTML)}</${tag}>`;
        }
        renderParagraph(field) {
            const innerHTML = field.meta?.innerHTML || field.meta?.label || 'Paragraph text';
            const attributes = {
                id: this.getFieldId(field),
                class: field.properties?.class || 'text-gray-700 leading-relaxed',
                style: field.properties?.style || undefined
            };
            return `<p ${this.formatAttributes(attributes)}>${this.escapeHtml(innerHTML)}</p>`;
        }
        renderDiv(field) {
            const innerHTML = field.meta?.innerHTML || field.meta?.label || '';
            const attributes = {
                id: this.getFieldId(field),
                class: field.properties?.class || undefined,
                style: field.properties?.style || undefined
            };
            return `<div ${this.formatAttributes(attributes)}>${this.escapeHtml(innerHTML)}</div>`;
        }
        renderSpan(field) {
            const innerHTML = field.meta?.innerHTML || field.meta?.label || '';
            const attributes = {
                id: this.getFieldId(field),
                class: field.properties?.class || undefined,
                style: field.properties?.style || undefined
            };
            return `<span ${this.formatAttributes(attributes)}>${this.escapeHtml(innerHTML)}</span>`;
        }
        renderLink(field) {
            const innerHTML = field.meta?.innerHTML || field.meta?.label || 'Link';
            const attributes = {
                id: this.getFieldId(field),
                href: field.properties?.href || '#',
                target: field.properties?.target || undefined,
                class: field.properties?.class || 'text-blue-600 hover:text-blue-800 underline',
                style: field.properties?.style || undefined
            };
            return `<a ${this.formatAttributes(attributes)}>${this.escapeHtml(innerHTML)}</a>`;
        }
        renderPreformatted(field) {
            const innerHTML = field.meta?.innerHTML || field.meta?.label || '';
            const attributes = {
                id: this.getFieldId(field),
                class: field.properties?.class || 'bg-gray-100 p-4 rounded-md font-mono text-sm overflow-x-auto',
                style: field.properties?.style || undefined
            };
            return `<pre ${this.formatAttributes(attributes)}>${this.escapeHtml(innerHTML)}</pre>`;
        }
        renderCode(field) {
            const innerHTML = field.meta?.innerHTML || field.meta?.label || '';
            const attributes = {
                id: this.getFieldId(field),
                class: field.properties?.class || 'bg-gray-100 px-2 py-1 rounded font-mono text-sm',
                style: field.properties?.style || undefined
            };
            return `<code ${this.formatAttributes(attributes)}>${this.escapeHtml(innerHTML)}</code>`;
        }
        renderHorizontalRule(field) {
            const attributes = {
                id: this.getFieldId(field),
                class: field.properties?.class || 'border-gray-300 my-4',
                style: field.properties?.style || undefined
            };
            return `<hr ${this.formatAttributes(attributes)} />`;
        }
        renderLineBreak(field) {
            const attributes = {
                id: this.getFieldId(field),
                class: field.properties?.class || undefined
            };
            return `<br ${this.formatAttributes(attributes)} />`;
        }
        renderImage(field) {
            const attributes = {
                id: this.getFieldId(field),
                src: field.properties?.src || '',
                alt: field.properties?.alt || '',
                class: field.properties?.class || 'max-w-full h-auto rounded-lg',
                width: field.properties?.width || undefined,
                height: field.properties?.height || undefined,
                title: field.properties?.title || undefined,
                loading: field.properties?.loading || undefined,
                decoding: field.properties?.decoding || undefined,
                crossorigin: field.properties?.crossorigin || undefined,
                referrerpolicy: field.properties?.referrerpolicy || undefined,
                sizes: field.properties?.sizes || undefined,
                srcset: field.properties?.srcset || undefined,
                style: field.properties?.style || undefined
            };
            return `<img ${this.formatAttributes(attributes)} />`;
        }
        parseSelectOptions(optionsText) {
            if (!optionsText)
                return [];
            return optionsText.split('\n')
                .filter(line => line.trim())
                .map(line => {
                const trimmed = line.trim();
                // Support "label|value" format or just "label"
                if (trimmed.includes('|')) {
                    const [label, value] = trimmed.split('|', 2);
                    return { label: label?.trim() || '', value: value?.trim() || '' };
                }
                else {
                    return { label: trimmed, value: trimmed };
                }
            });
        }
        getTailwindColumnClass(width) {
            // Convert 12-column grid to Tailwind grid classes
            switch (width) {
                case 1: return 'col-span-1';
                case 2: return 'col-span-2';
                case 3: return 'col-span-3';
                case 4: return 'col-span-4';
                case 5: return 'col-span-5';
                case 6: return 'col-span-6';
                case 7: return 'col-span-7';
                case 8: return 'col-span-8';
                case 9: return 'col-span-9';
                case 10: return 'col-span-10';
                case 11: return 'col-span-11';
                case 12: return 'col-span-12';
                default: return 'col-span-12';
            }
        }
    }

    /**
     * Factory for creating HTML renderers
     */
    class RendererFactory {
        /**
         * Create a renderer instance by framework name
         */
        static createRenderer(framework = 'basic') {
            const rendererFactory = this.renderers.get(framework.toLowerCase());
            if (!rendererFactory) {
                throw new Error(`Renderer for framework '${framework}' not found. Available: ${Array.from(this.renderers.keys()).join(', ')}`);
            }
            return rendererFactory();
        }
        /**
         * Get list of available renderer frameworks
         */
        static getAvailableFrameworks() {
            return Array.from(this.renderers.keys());
        }
        /**
         * Register a new renderer
         */
        static registerRenderer(framework, rendererFactory) {
            this.renderers.set(framework.toLowerCase(), rendererFactory);
        }
        /**
         * Quick method to render form with specified framework
         */
        static renderForm(rows, framework = 'basic', options = {}) {
            const renderer = this.createRenderer(framework);
            return renderer.renderForm(rows, { ...options, framework: framework });
        }
        /**
         * Quick method to render preview with specified framework
         */
        static renderPreview(rows, framework = 'basic', options = {}) {
            const renderer = this.createRenderer(framework);
            return renderer.renderPreview(rows, { ...options, framework: framework });
        }
        /**
         * Quick method to render single field with specified framework
         */
        static renderField(field, framework = 'basic', options = {}) {
            const renderer = this.createRenderer(framework);
            return renderer.renderField(field, { ...options, framework: framework });
        }
    }
    RendererFactory.renderers = new Map([
        ['basic', () => new BasicRenderer()],
        ['bootstrap', () => new BootstrapRenderer()],
        ['tailwind', () => new TailwindRenderer()],
        ['preview', () => new PreviewRenderer()],
    ]);
    /**
     * HTML Generator - Main interface for generating HTML from form data
     */
    class HTMLGenerator {
        constructor(framework = 'basic') {
            this.framework = framework;
            this.renderer = RendererFactory.createRenderer(framework);
        }
        /**
         * Generate complete HTML form
         */
        generateForm(rows, options = {}) {
            return this.renderer.renderForm(rows, { ...options, framework: this.framework });
        }
        /**
         * Generate HTML preview
         */
        generatePreview(rows, options = {}) {
            return this.renderer.renderPreview(rows, { ...options, framework: this.framework });
        }
        /**
         * Generate HTML for a single field
         */
        generateField(field, options = {}) {
            return this.renderer.renderField(field, { ...options, framework: this.framework });
        }
        /**
         * Generate HTML for a single row
         */
        generateRow(row, options = {}) {
            return this.renderer.renderRow(row, { ...options, framework: this.framework });
        }
        /**
         * Generate HTML for a single column
         */
        generateColumn(column, options = {}) {
            return this.renderer.renderColumn(column, { ...options, framework: this.framework });
        }
        /**
         * Switch to a different framework
         */
        setFramework(framework) {
            this.framework = framework;
            this.renderer = RendererFactory.createRenderer(framework);
        }
        /**
         * Get current framework
         */
        getFramework() {
            return this.framework;
        }
        /**
         * Get available frameworks
         */
        static getAvailableFrameworks() {
            return RendererFactory.getAvailableFrameworks();
        }
    }

    /**
     * Manages DOM operations within a specific container scope
     * Prevents FormBuilder from affecting elements outside its container
     */
    class ScopedDOMManager {
        constructor(container) {
            this.container = container;
            this.scopeId = this.generateScopeId();
            this.markContainerScope();
        }
        /**
         * Generate unique scope ID for this FormBuilder instance
         */
        generateScopeId() {
            return `fb-scope-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        }
        /**
         * Mark container with scope attributes for debugging and identification
         */
        markContainerScope() {
            this.container.setAttribute('data-formbuilder-scope', this.scopeId);
            this.container.setAttribute('data-fb-version', '0.1.0');
            this.container.setAttribute('data-fb-initialized', new Date().toISOString());
        }
        /**
         * Safe DOM query methods (container-scoped only)
         */
        querySelector(selector) {
            try {
                return this.container.querySelector(selector);
            }
            catch (error) {
                console.warn(`⚠️ FormBuilder: Invalid selector "${selector}":`, error);
                return null;
            }
        }
        querySelectorAll(selector) {
            try {
                return this.container.querySelectorAll(selector);
            }
            catch (error) {
                console.warn(`⚠️ FormBuilder: Invalid selector "${selector}":`, error);
                return document.querySelectorAll(''); // Empty NodeList
            }
        }
        getElementById(id) {
            // Search for ID only within container scope
            return this.container.querySelector(`#${CSS.escape(id)}`);
        }
        /**
         * Safe event handling (container-scoped only)
         */
        addEventListener(event, handler, options) {
            this.container.addEventListener(event, handler, options);
        }
        removeEventListener(event, handler) {
            this.container.removeEventListener(event, handler);
        }
        /**
         * Element creation with scope marking
         */
        createElement(tagName, attributes) {
            const element = document.createElement(tagName);
            // Mark element as belonging to this FormBuilder scope
            element.setAttribute('data-fb-scope', this.scopeId);
            element.setAttribute('data-fb-created', 'true');
            if (attributes) {
                Object.entries(attributes).forEach(([key, value]) => {
                    element.setAttribute(key, value);
                });
            }
            return element;
        }
        /**
         * Create element with safe ID (scoped to avoid conflicts)
         */
        createElementWithId(tagName, id, attributes) {
            const scopedId = this.getScopedId(id);
            const element = this.createElement(tagName, {
                id: scopedId,
                ...attributes
            });
            return element;
        }
        /**
         * Generate scoped ID to prevent conflicts with external elements
         */
        getScopedId(id) {
            return `${this.scopeId}-${id}`;
        }
        /**
         * Scope validation methods
         */
        isInScope(element) {
            if (!element)
                return false;
            return this.container.contains(element);
        }
        validateOperation(targetElement, operation = 'operation') {
            if (!targetElement) {
                console.warn(`⚠️ FormBuilder Security: Attempted ${operation} on null/undefined element`);
                return false;
            }
            // Allow operations on PropertyPanel elements (delete button, etc)
            if (this.isPropertyPanelElement(targetElement)) {
                return true;
            }
            if (!this.isInScope(targetElement)) {
                console.warn(`⚠️ FormBuilder Security: Blocked ${operation} on external element:`, {
                    element: targetElement,
                    tagName: targetElement.tagName,
                    id: targetElement.id,
                    className: targetElement.className,
                    scopeId: this.scopeId
                });
                // Log stack trace for debugging in development
                if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
                    console.trace('Stack trace for security violation');
                }
                return false;
            }
            return true;
        }
        /**
         * Check if element is part of PropertyPanel (allowed external element)
         */
        isPropertyPanelElement(element) {
            // Check if element or any parent has PropertyPanel-related classes/IDs
            let current = element;
            while (current) {
                // Check for PropertyPanel container
                if (current.classList.contains('properties-panel') ||
                    current.classList.contains('properties-content') ||
                    current.classList.contains('property-group') ||
                    current.classList.contains('btn-delete-element') ||
                    current.id === 'deleteElement') {
                    return true;
                }
                current = current.parentElement;
            }
            return false;
        }
        /**
         * Safe element manipulation methods
         */
        safeAppendChild(parent, child) {
            if (!this.validateOperation(parent, 'appendChild on parent') ||
                !this.validateOperation(child, 'appendChild on child')) {
                return false;
            }
            try {
                parent.appendChild(child);
                return true;
            }
            catch (error) {
                console.error('⚠️ FormBuilder: Failed to append child:', error);
                return false;
            }
        }
        safeRemoveChild(parent, child) {
            if (!this.validateOperation(parent, 'removeChild on parent') ||
                !this.validateOperation(child, 'removeChild on child')) {
                return false;
            }
            try {
                parent.removeChild(child);
                return true;
            }
            catch (error) {
                console.error('⚠️ FormBuilder: Failed to remove child:', error);
                return false;
            }
        }
        safeSetAttribute(element, name, value) {
            if (!this.validateOperation(element, `setAttribute ${name}`)) {
                return false;
            }
            try {
                element.setAttribute(name, value);
                return true;
            }
            catch (error) {
                console.error('⚠️ FormBuilder: Failed to set attribute:', error);
                return false;
            }
        }
        safeRemoveAttribute(element, name) {
            if (!this.validateOperation(element, `removeAttribute ${name}`)) {
                return false;
            }
            try {
                element.removeAttribute(name);
                return true;
            }
            catch (error) {
                console.error('⚠️ FormBuilder: Failed to remove attribute:', error);
                return false;
            }
        }
        /**
         * Get container reference and scope info
         */
        getContainer() {
            return this.container;
        }
        getScopeId() {
            return this.scopeId;
        }
        /**
         * Debug information
         */
        getDebugInfo() {
            return {
                scopeId: this.scopeId,
                containerTagName: this.container.tagName,
                containerId: this.container.id,
                containerClasses: this.container.className,
                elementsInScope: this.container.querySelectorAll('[data-fb-scope]').length,
                initialized: this.container.getAttribute('data-fb-initialized')
            };
        }
        /**
         * Cleanup method for when FormBuilder is destroyed
         */
        cleanup() {
            // Remove all scoped elements
            const scopedElements = this.container.querySelectorAll(`[data-fb-scope="${this.scopeId}"]`);
            scopedElements.forEach(element => {
                if (element.parentNode) {
                    element.parentNode.removeChild(element);
                }
            });
            // Remove scope attributes from container
            this.container.removeAttribute('data-formbuilder-scope');
            this.container.removeAttribute('data-fb-version');
            this.container.removeAttribute('data-fb-initialized');
        }
    }

    /**
     * AstraFormBuilder - Main form builder class
     * Developed by Astra Dev
     */
    class AstraFormBuilder extends EventEmitter {
        constructor(containerSelector, options) {
            super();
            this.rows = [];
            this.formElement = null; // Special form element
            this.selectedElement = null;
            this.debugMode = false;
            this.canvasClickHandler = null;
            this.addColumnDebounce = {};
            this.isLoaded = false;
            // Auto-increment counters for generating unique IDs and names
            this.elementCounters = {};
            // Resolve container element from string selector or HTMLElement
            this.container = this.resolveContainer(containerSelector);
            // Initialize scoped DOM manager for container isolation
            this.scopedDOM = new ScopedDOMManager(this.container);
            // Apply options if provided
            if (options?.debug !== undefined) {
                this.debugMode = options.debug;
            }
            // Initialize element registry
            this.elementRegistry = new ElementRegistry();
            // Load custom element registry if provided
            if (options?.elementRegistry) {
                try {
                    this.elementRegistry.loadCustomRegistry(options.elementRegistry);
                    if (this.debugMode) {
                        console.log('✅ Custom ElementRegistry loaded successfully:', Object.keys(options.elementRegistry));
                    }
                }
                catch (error) {
                    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
                    console.error('❌ Failed to load custom ElementRegistry:', errorMessage);
                    throw new Error(`Invalid ElementRegistry configuration: ${errorMessage}`);
                }
            }
            this.previewRenderer = new PreviewRenderer();
            // Generate the complete HTML structure internally
            this.createFormBuilderStructure();
            // Get references to the generated elements using scoped DOM
            this.canvas = this.scopedDOM.getElementById(this.scopedDOM.getScopedId('formCanvas'));
            this.toolbox = this.scopedDOM.querySelector('.toolbox');
            this.propertiesPanel = this.scopedDOM.getElementById(this.scopedDOM.getScopedId('propertiesPanel'));
            const propertiesContainer = this.scopedDOM.getElementById(this.scopedDOM.getScopedId('propertiesContent'));
            this.propertyPanelInstance = new PropertyPanel(propertiesContainer);
            // Initialize drag and drop manager with scoped DOM
            this.dragDropManager = new DragDropManager(this.container, this.scopedDOM);
            this.init();
            // Load initial form data if provided
            if (options?.form) {
                this.loadInitialForm(options.form);
            }
        }
        /**
         * Load initial form data during construction
         */
        loadInitialForm(formData) {
            try {
                let dataToImport;
                // Convert FormData to FormBuilderData format
                if (!Array.isArray(formData) && 'version' in formData) {
                    // It's FormData (legacy format)
                    const metadata = {};
                    if (formData.metadata.title)
                        metadata.title = formData.metadata.title;
                    if (formData.metadata.description)
                        metadata.description = formData.metadata.description;
                    if (formData.version)
                        metadata.version = formData.version;
                    if (formData.metadata.created)
                        metadata.createdAt = formData.metadata.created;
                    dataToImport = {
                        formElement: null,
                        rows: formData.rows,
                        metadata
                    };
                }
                else {
                    // It's already FormBuilderData or FormRowInstance[]
                    dataToImport = formData;
                }
                this.importForm(dataToImport);
                if (this.debugMode) {
                    console.log('✅ Initial form data loaded successfully:', {
                        hasForm: !!this.formElement,
                        rows: this.rows.length
                    });
                }
            }
            catch (error) {
                const errorMessage = error instanceof Error ? error.message : 'Unknown error';
                console.error('❌ Failed to load initial form data:', errorMessage);
                throw new Error(`Invalid initial form data: ${errorMessage}`);
            }
        }
        /**
         * Resolve container element from string selector or HTMLElement
         */
        resolveContainer(containerSelector) {
            // If already an HTMLElement, validate and return
            if (containerSelector instanceof HTMLElement) {
                return containerSelector;
            }
            // If it's a string, parse and find the element
            if (typeof containerSelector === 'string') {
                let element = null;
                if (containerSelector.startsWith('#')) {
                    // ID selector: #elementId
                    const id = containerSelector.substring(1);
                    element = document.getElementById(id);
                    if (!element) {
                        throw new Error(`FormBuilder Error: Element with ID "${id}" not found. Make sure the element exists in the DOM before initializing FormBuilder.`);
                    }
                }
                else if (containerSelector.startsWith('.')) {
                    // Class selector: .className
                    const className = containerSelector.substring(1);
                    const elements = document.getElementsByClassName(className);
                    if (elements.length === 0) {
                        throw new Error(`FormBuilder Error: No elements found with class "${className}". Make sure at least one element with this class exists in the DOM.`);
                    }
                    if (elements.length > 1) {
                        console.warn(`FormBuilder Warning: Multiple elements found with class "${className}". Using the first one.`);
                    }
                    element = elements[0];
                }
                else {
                    // Assume it's an ID without the # prefix
                    element = document.getElementById(containerSelector);
                    if (!element) {
                        throw new Error(`FormBuilder Error: Element with ID "${containerSelector}" not found. Make sure the element exists in the DOM before initializing FormBuilder.`);
                    }
                }
                if (!element) {
                    throw new Error(`FormBuilder Error: Unable to find element with selector "${containerSelector}". Please check your selector and ensure the element exists in the DOM.`);
                }
                return element;
            }
            // Invalid type
            throw new Error(`FormBuilder Error: Invalid container parameter. Expected string selector or HTMLElement, received ${typeof containerSelector}.`);
        }
        /**
         * Create the complete Form Builder HTML structure with scoped IDs
         */
        createFormBuilderStructure() {
            const canvasId = this.scopedDOM.getScopedId('formCanvas');
            const propertiesPanelId = this.scopedDOM.getScopedId('propertiesPanel');
            const propertiesContentId = this.scopedDOM.getScopedId('propertiesContent');
            const elementsListId = this.scopedDOM.getScopedId('elementsList');
            const dropZoneId = this.scopedDOM.getScopedId('dropZone');
            this.container.innerHTML = `
            <!-- Main Content -->
            <div class="main-content">
                <!-- Toolbox -->
                <aside class="toolbox">
                    <h3>Elements Toolbox</h3>
                    <div id="${elementsListId}">
                        <!-- Elements will be populated by JavaScript organized by categories -->
                    </div>
                </aside>

                <!-- Form Canvas -->
                <main class="canvas-container">
                    <div class="canvas form-canvas drop-zone" id="${canvasId}">
                        <div class="drop-zone" id="${dropZoneId}">
                            <div class="drop-zone-placeholder">
                                <p>Drag elements here to build your form</p>
                            </div>
                        </div>
                    </div>
                </main>

                <!-- Properties Panel -->
                <aside class="properties-panel" id="${propertiesPanelId}">
                    <h3>Properties</h3>
                    <div class="properties-content" id="${propertiesContentId}">
                        <p class="no-selection">Select an element to edit its properties</p>
                    </div>
                </aside>
            </div>
        `;
        }
        init() {
            // Configuração básica - canvas já existe no HTML
            this.setupEventListeners();
            this.populateToolbox();
            this.setupDragAndDrop();
            this.setupDebugToggle();
            this.render();
            // Marcar como carregado e disparar evento
            this.isLoaded = true;
            this.dispatchFormBuilderLoadedEvent();
        }
        /**
         * Convert string to slug format (kebab-case)
         */
        toSlug(text) {
            return text
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '');
        }
        /**
         * Dispatch FormBuilder loaded event to notify parent component
         */
        dispatchFormBuilderLoadedEvent() {
            const event = new CustomEvent(FORM_BUILDER_EVENTS.FORM_BUILDER_LOADED, {
                detail: {
                    formBuilder: this,
                    isReady: true,
                    timestamp: new Date().toISOString()
                },
                bubbles: true,
                cancelable: false
            });
            this.container.dispatchEvent(event);
            if (this.debugMode) {
                console.log('🚀 FormBuilder loaded event dispatched:', {
                    eventType: FORM_BUILDER_EVENTS.FORM_BUILDER_LOADED,
                    target: this.container,
                    detail: event.detail
                });
            }
        }
        /**
         * Generate unique ID for an element type
         */
        generateUniqueId(elementType) {
            // Initialize counter if it doesn't exist
            if (!(elementType in this.elementCounters)) {
                this.elementCounters[elementType] = 0;
            }
            // Increment counter (TypeScript knows it exists now)
            this.elementCounters[elementType] = (this.elementCounters[elementType] || 0) + 1;
            // Generate slug-formatted ID
            const baseSlug = this.toSlug(elementType);
            return `${baseSlug}-${this.elementCounters[elementType]}`;
        }
        /**
         * Reset all element counters (useful for imports or when clearing form)
         */
        resetElementCounters() {
            this.elementCounters = {};
        }
        /**
         * Update counters based on existing form data (useful after imports)
         */
        updateCountersFromExistingData() {
            this.resetElementCounters();
            // Update form element counter if it exists
            if (this.formElement) {
                this.updateCounterFromId('form', this.formElement.id);
            }
            // Scan existing form data and update counters
            this.rows.forEach(row => {
                // Update row counter
                this.updateCounterFromId('row', row.id);
                row.columns.forEach(column => {
                    // Update column counter
                    this.updateCounterFromId('column', column.id);
                    column.fields.forEach(field => {
                        // Update field counter
                        this.updateCounterFromId(field.htmlTag, field.id);
                    });
                });
            });
        }
        /**
         * Update a specific counter based on an existing ID
         */
        updateCounterFromId(elementType, id) {
            // Extract number from ID (e.g., "text-input-3" -> 3)
            const baseSlug = this.toSlug(elementType);
            const regex = new RegExp(`^${baseSlug}-(\\d+)$`);
            const match = id.match(regex);
            if (match && match[1]) {
                const number = parseInt(match[1], 10);
                if (!isNaN(number)) {
                    // Update counter to be at least this number
                    this.elementCounters[elementType] = Math.max(this.elementCounters[elementType] || 0, number);
                }
            }
        }
        /**
         * Check if an element type is a form element (input, textarea, select, button, etc.)
         */
        isFormElement(elementType) {
            const config = this.elementRegistry.get(elementType);
            return config ? ElementTypeUtils.isFormControl(config.htmlTag) : false;
        }
        /**
         * Safe DOM query methods (container-scoped only)
         */
        findElement(selector) {
            return this.scopedDOM.querySelector(selector);
        }
        findElements(selector) {
            return this.scopedDOM.querySelectorAll(selector);
        }
        findById(id) {
            return this.scopedDOM.getElementById(id);
        }
        /**
         * Safe element manipulation methods
         */
        safeAppendChild(parent, child) {
            return this.scopedDOM.safeAppendChild(parent, child);
        }
        safeRemoveChild(parent, child) {
            return this.scopedDOM.safeRemoveChild(parent, child);
        }
        safeSetAttribute(element, name, value) {
            return this.scopedDOM.safeSetAttribute(element, name, value);
        }
        safeRemoveAttribute(element, name) {
            return this.scopedDOM.safeRemoveAttribute(element, name);
        }
        /**
         * Validate that operations are performed only on elements within the container
         */
        validateElementOperation(element, operation) {
            return this.scopedDOM.validateOperation(element, operation);
        }
        /**
         * Create elements with proper scoping
         */
        createScopedElement(tagName, attributes) {
            return this.scopedDOM.createElement(tagName, attributes);
        }
        createScopedElementWithId(tagName, id, attributes) {
            return this.scopedDOM.createElementWithId(tagName, id, attributes);
        }
        setupEventListeners() {
            // Listen to property panel events
            this.propertyPanelInstance.on('propertyChanged', this.handlePropertyChange.bind(this));
            this.propertyPanelInstance.on('deleteElement', this.handleDeleteElement.bind(this));
            // Use scoped event listeners instead of document-level events
            this.setupScopedEventListeners();
        }
        /**
         * Setup event listeners scoped to the container only
         */
        setupScopedEventListeners() {
            // Click events within container only
            this.scopedDOM.addEventListener('click', ((e) => this.handleScopedClick(e)));
            // Drag and drop events within container only
            this.scopedDOM.addEventListener('dragstart', ((e) => this.handleScopedDragStart(e)));
            this.scopedDOM.addEventListener('dragover', ((e) => this.handleScopedDragOver(e)));
            this.scopedDOM.addEventListener('drop', ((e) => this.handleScopedDrop(e)));
            this.scopedDOM.addEventListener('dragenter', ((e) => this.handleScopedDragEnter(e)));
            this.scopedDOM.addEventListener('dragleave', ((e) => this.handleScopedDragLeave(e)));
        }
        /**
         * Handle clicks within the container scope only
         */
        handleScopedClick(e) {
            const target = e.target;
            // Validate that the click target is within our scope
            if (!this.validateElementOperation(target, 'click')) {
                return;
            }
            // Check if click is on a toolbox element
            const elementItem = target.closest('.element-item');
            if (elementItem && elementItem.dataset.elementType) {
                e.preventDefault();
                const elementType = elementItem.dataset.elementType;
                if (this.debugMode) {
                    console.log('🖱️ Click-to-add element:', elementType);
                }
                // Add element to last row, last column (or create new row if needed)
                this.addElementByClick(elementType);
                return;
            }
            // Handle canvas clicks - delegate to existing logic
            if (this.canvasClickHandler) {
                this.canvasClickHandler(e);
            }
        }
        /**
         * Handle scoped drag start events
         */
        handleScopedDragStart(e) {
            const target = e.target;
            if (!this.validateElementOperation(target, 'dragstart')) {
                e.preventDefault();
                return;
            }
            // Use existing drag start logic from setupDragAndDrop
            // This will be integrated with the existing drag and drop system
        }
        /**
         * Handle scoped drag over events
         */
        handleScopedDragOver(e) {
            const target = e.target;
            if (!this.validateElementOperation(target, 'dragover')) {
                return;
            }
            // Delegate to existing drag over logic
            e.preventDefault();
        }
        /**
         * Handle scoped drop events
         */
        handleScopedDrop(e) {
            const target = e.target;
            if (!this.validateElementOperation(target, 'drop')) {
                return;
            }
            // Delegate to existing drop handlers
        }
        /**
         * Handle scoped drag enter events
         */
        handleScopedDragEnter(e) {
            const target = e.target;
            if (!this.validateElementOperation(target, 'dragenter')) {
                return;
            }
            // Continue with existing logic
        }
        /**
         * Handle scoped drag leave events
         */
        handleScopedDragLeave(e) {
            const target = e.target;
            if (!this.validateElementOperation(target, 'dragleave')) {
                return;
            }
            // Continue with existing logic
        }
        setupDragAndDrop() {
            console.log('Setting up drag and drop with DragDropManager (scoped)...');
            // DragDropManager now handles all drag and drop with scoped DOM
            // Listen to DragDropManager events instead of setting up duplicate listeners
            this.dragDropManager.on('elementDropped', this.handleElementDropped.bind(this));
            // The DragDropManager is initialized with scopedDOM and handles:
            // - dragstart events (with scope validation)
            // - dragover events (with scope validation) 
            // - drop events (with scope validation)
            // - dragleave events (with scope validation)
            // - dragend events (with scope validation)
            if (this.debugMode) {
                console.log('✅ DragDropManager initialized with ScopedDOM for secure drag operations');
            }
        }
        handleSidebarDrop(e) {
            e.preventDefault();
            e.stopPropagation();
            const elementType = e.dataTransfer?.getData('text/plain');
            if (elementType) {
                const target = e.target;
                const column = target.closest('.form-column');
                const row = target.closest('.form-row');
                // Special handling for form element
                if (elementType === 'form') {
                    this.createFormElement();
                    return;
                }
                // Apply business rules based on element type
                if (elementType === 'row') {
                    // Rows can only be added at root level (canvas)
                    if (this.debugMode)
                        console.log('Adding row to canvas');
                    this.createRow();
                }
                else if (elementType === 'column') {
                    // Columns can be added to rows or canvas
                    if (row) {
                        const rowId = row.dataset.rowId;
                        if (this.debugMode)
                            console.log('Adding column to row:', rowId);
                        if (rowId) {
                            this.addColumnToRowById(rowId);
                        }
                    }
                    else {
                        // If dropped on canvas, create new row with column
                        if (this.debugMode)
                            console.log('Creating new row with column on canvas');
                        this.createRow();
                    }
                }
                else {
                    // Regular form elements (text, select, etc.)
                    if (column) {
                        // Dropped on a column - add element to that specific column
                        const columnId = column.dataset.elementId;
                        if (this.debugMode)
                            console.log('Adding element to column:', elementType, columnId);
                        this.createElementInColumn(elementType, columnId);
                    }
                    else if (row) {
                        // Dropped on a row (but not on a column) - add to first column of that row
                        const rowId = row.dataset.rowId;
                        if (this.debugMode)
                            console.log('Adding element to row:', elementType, rowId);
                        this.createElementInRow(elementType, rowId);
                    }
                    else {
                        // Dropped on canvas - create new row if needed
                        if (this.debugMode)
                            console.log('Adding element to new row on canvas:', elementType);
                        this.createElementInNewRow(elementType);
                    }
                }
            }
        }
        handleInternalDrop(e) {
            const elementId = e.dataTransfer?.getData('application/x-element-id');
            const elementType = e.dataTransfer?.getData('application/x-element-type');
            if (!elementId || !elementType)
                return;
            const target = e.target;
            target.closest('.form-column');
            target.closest('.form-row');
            if (this.debugMode)
                console.log('Moving internal element:', elementType, elementId);
            if (elementType === 'row') {
                this.moveRow(elementId, target, e);
            }
            else if (elementType === 'column') {
                this.moveColumn(elementId, target);
            }
            else if (elementType === 'field') {
                this.moveField(elementId, target);
            }
        }
        createElementInColumn(elementType, columnId) {
            // Find the specific column
            let targetColumn = null;
            for (const row of this.rows) {
                for (const column of row.columns) {
                    if (column.id === columnId) {
                        targetColumn = column;
                        break;
                    }
                }
                if (targetColumn)
                    break;
            }
            if (!targetColumn) {
                console.warn('Target column not found:', columnId);
                return;
            }
            // Create the field
            const fieldId = Utils.generateId(); // Keep original unique ID for field instance
            const fieldConfig = this.elementRegistry.get(elementType);
            if (fieldConfig) {
                // Extract default values from property definitions
                const properties = {};
                if (fieldConfig.properties) {
                    for (const [key, propDef] of Object.entries(fieldConfig.properties)) {
                        properties[key] = propDef.defaultValue || '';
                    }
                }
                // Set auto-generated slug-format ID and name for properties
                const autoIncrementId = this.generateUniqueId(elementType);
                properties.id = autoIncrementId;
                if (fieldConfig.properties?.name) {
                    properties.name = autoIncrementId; // Use same value for name
                }
                // Initialize meta with default values
                const meta = {};
                if (fieldConfig.meta) {
                    for (const [key, propDef] of Object.entries(fieldConfig.meta)) {
                        meta[key] = propDef.defaultValue || '';
                    }
                }
                // For form elements, set meta.label to the generated ID (if label field exists)
                if (this.isFormElement(elementType) && fieldConfig.meta?.label) {
                    meta.label = autoIncrementId;
                }
                const field = {
                    id: fieldId, // Original unique ID for internal tracking
                    elementRegistryId: elementType, // Store the original element registry ID
                    htmlTag: fieldConfig.htmlTag,
                    properties: properties,
                    meta: meta,
                    events: {}
                };
                targetColumn.fields.push(field);
                this.render();
                this.emitFormChange();
            }
            else {
                console.error('Element type not found:', elementType);
            }
        }
        createElementInRow(elementType, rowId) {
            if (this.debugMode)
                console.log('Creating element in specific row:', elementType, rowId);
            // Find the specific row
            const targetRow = this.rows.find(r => r.id === rowId);
            if (!targetRow) {
                console.warn('Target row not found:', rowId);
                return;
            }
            // Add to first column of the row, or create a column if none exists
            if (targetRow.columns.length === 0) {
                // Create a column if none exists
                const columnId = this.generateUniqueId('column');
                const newColumn = {
                    id: columnId,
                    width: 12,
                    fields: [],
                    properties: { id: columnId }
                };
                targetRow.columns.push(newColumn);
            }
            // Add element to first column (now guaranteed to exist)
            const firstColumn = targetRow.columns[0];
            if (firstColumn) {
                this.createElementInColumn(elementType, firstColumn.id);
            }
        }
        createElementInNewRow(elementType) {
            if (this.debugMode)
                console.log('Creating element in new row:', elementType);
            // Create a new row with one column
            const rowId = this.generateUniqueId('row');
            const columnId = this.generateUniqueId('column');
            const newColumn = {
                id: columnId,
                width: 12,
                fields: [],
                properties: { id: columnId }
            };
            const newRow = {
                id: rowId,
                columns: [newColumn],
                properties: { id: rowId }
            };
            this.rows.push(newRow);
            // Add element to the new column
            this.createElementInColumn(elementType, columnId);
            this.emitFormChange();
        }
        /**
         * Create form element (special handling)
         */
        createFormElement() {
            // Check if form already exists
            if (this.formElement) {
                alert('Only one form element is allowed per form builder. Please remove the existing form element first.');
                return;
            }
            if (this.debugMode)
                console.log('Creating form element');
            const formConfig = this.elementRegistry.get('form');
            if (!formConfig) {
                console.error('Form element configuration not found');
                return;
            }
            // Create form element properties
            const properties = {};
            if (formConfig.properties) {
                for (const [key, config] of Object.entries(formConfig.properties)) {
                    properties[key] = config.defaultValue || '';
                }
            }
            // Generate unique ID
            const formId = this.generateUniqueId('form');
            properties.id = formId;
            if (formConfig.properties?.name) {
                properties.name = formId;
            }
            // Create form element events
            const events = {};
            if (formConfig.events) {
                for (const [key, config] of Object.entries(formConfig.events)) {
                    events[key] = config.defaultValue || {};
                }
            }
            // Create the form element instance
            this.formElement = {
                id: Utils.generateId(),
                elementRegistryId: 'form',
                htmlTag: formConfig.htmlTag,
                properties,
                meta: {},
                events: events
            };
            this.render();
            this.emitFormChange();
        }
        setupDebugToggle() {
            // Use existing debug button from HTML
            const debugToggle = this.findElement('#debugToggle');
            if (!debugToggle) {
                console.warn('Debug toggle button not found in HTML');
                return;
            }
            debugToggle.addEventListener('click', () => {
                this.debugMode = !this.debugMode;
                if (this.debugMode) {
                    this.container.classList.add('debug-mode');
                    debugToggle.textContent = '🐛 Debug: ON';
                    debugToggle.classList.add('btn-success');
                    debugToggle.classList.remove('btn-secondary');
                }
                else {
                    this.container.classList.remove('debug-mode');
                    debugToggle.textContent = '🐛 Debug';
                    debugToggle.classList.add('btn-secondary');
                    debugToggle.classList.remove('btn-success');
                }
                this.render(); // Re-render to show/hide debug info
            });
        }
        highlightElement(elementId) {
            // Remove previous highlights using scoped DOM
            this.scopedDOM.querySelectorAll('.selected').forEach(el => {
                el.classList.remove('selected');
            });
            // Add highlight to current element using scoped DOM
            const element = this.scopedDOM.querySelector(`[data-element-id="${elementId}"]`);
            if (element) {
                element.classList.add('selected');
            }
        }
        handlePropertyChange(data) {
            const { elementId, property, value, section = 'properties' } = data;
            // Find and update the element
            const element = this.findElementById(elementId);
            if (!element) {
                console.warn('Element not found for property update:', elementId);
                return;
            }
            // Update the appropriate section of the element
            switch (section) {
                case 'properties':
                    if (!element.properties) {
                        element.properties = {};
                    }
                    element.properties[property] = value;
                    break;
                case 'meta':
                    const fieldElement = element;
                    if (!fieldElement.meta) {
                        fieldElement.meta = {};
                    }
                    fieldElement.meta[property] = value;
                    break;
                case 'events':
                    const eventElement = element;
                    if (!eventElement.events) {
                        eventElement.events = {};
                    }
                    eventElement.events[property] = value;
                    break;
                case 'alpine':
                    const alpineElement = element;
                    if (!alpineElement.alpine) {
                        alpineElement.alpine = {};
                    }
                    alpineElement.alpine[property] = value;
                    break;
                default:
                    console.warn('Unknown section for property update:', section);
                    return;
            }
            // Re-render the element to reflect changes
            this.render();
            // Emit form change event for external listeners
            this.emitFormChange();
            // Emit property changed event for external listeners
            this.emit('propertyChanged', data);
        }
        handleDeleteElement(data) {
            const { elementId } = data;
            this.deleteElement(elementId);
        }
        handleElementDropped(eventData) {
            const { data, dropTarget, event } = eventData;
            const { elementType, isNew, elementId, sourceType } = data;
            if (this.debugMode) {
                console.log('🎯 Element dropped:', { elementType, isNew, elementId, sourceType, dropTarget });
            }
            if (isNew) {
                // Handle new element creation from toolbox
                this.handleSidebarDrop(event);
            }
            else {
                // Handle moving existing element
                this.handleInternalDrop(event);
            }
        }
        findElementById(elementId) {
            // Check if it's the form element
            if (this.formElement && this.formElement.id === elementId) {
                return this.formElement;
            }
            for (const row of this.rows) {
                if (row.id === elementId)
                    return row;
                for (const column of row.columns) {
                    if (column.id === elementId)
                        return column;
                    for (const field of column.fields) {
                        if (field.id === elementId)
                            return field;
                    }
                }
            }
            return null;
        }
        /**
         * Add element by clicking (to last row, last column)
         */
        addElementByClick(elementType) {
            try {
                // Get or create the form element if it doesn't exist
                if (!this.formElement) {
                    // Create the form element like in the constructor
                    const formId = this.generateUniqueId('form');
                    const formConfig = this.elementRegistry.get('form');
                    if (!formConfig) {
                        console.error('Form element configuration not found');
                        return;
                    }
                    const properties = {
                        id: formId,
                        name: formId,
                        method: 'POST',
                        action: '',
                        class: '',
                        enctype: 'application/x-www-form-urlencoded'
                    };
                    // Get standard events manually since getStandardEvents is private
                    const events = {
                        onChange: { action: 'validate', target: 'vanilla', parameters: {} },
                        onSubmit: { action: 'submit', target: 'vanilla', parameters: {} }
                    };
                    this.formElement = {
                        id: Utils.generateId(),
                        elementRegistryId: 'form',
                        htmlTag: formConfig.htmlTag,
                        properties,
                        meta: {},
                        events: events
                    };
                }
                // Determine where to add the element - SEMPRE criar nova linha
                let targetRow;
                let targetColumn;
                // SEMPRE criar uma nova linha com uma coluna para o elemento
                const rowId = this.generateUniqueId('row');
                const columnId = this.generateUniqueId('column');
                targetRow = {
                    id: rowId,
                    columns: [],
                    properties: { id: rowId }
                };
                targetColumn = {
                    id: columnId,
                    width: 12, // Full width
                    fields: [],
                    properties: { id: columnId }
                };
                targetRow.columns.push(targetColumn);
                this.rows.push(targetRow);
                // Create and add the new element using existing method
                const autoIncrementId = this.generateUniqueId(elementType);
                const elementConfig = this.elementRegistry.get(elementType);
                if (!elementConfig) {
                    console.error(`Element configuration not found for type: ${elementType}`);
                    return;
                }
                // Extract properties with defaultValues
                const properties = {
                    id: autoIncrementId,
                    name: autoIncrementId
                };
                if (elementConfig.properties) {
                    for (const [key, propDef] of Object.entries(elementConfig.properties)) {
                        properties[key] = propDef.defaultValue || '';
                    }
                }
                // Extract meta with defaultValues
                const meta = {
                    label: autoIncrementId // Auto-assign ID to meta.label
                };
                if (elementConfig.meta) {
                    for (const [key, propDef] of Object.entries(elementConfig.meta)) {
                        meta[key] = propDef.defaultValue || '';
                    }
                }
                const newElement = {
                    id: Utils.generateId(),
                    elementRegistryId: elementType,
                    htmlTag: elementConfig.htmlTag,
                    properties,
                    meta,
                    events: {} // Start with empty events, will be populated by PropertyPanel if needed
                };
                targetColumn.fields.push(newElement);
                if (this.debugMode) {
                    console.log('✅ Element added by click:', {
                        elementType,
                        elementId: newElement.id,
                        rowId: targetRow.id,
                        columnId: targetColumn.id
                    });
                }
                // Re-render and emit change
                this.render();
                this.emitFormChange();
                // Select the newly added element
                this.selectElement(newElement.id);
            }
            catch (error) {
                console.error('Error adding element by click:', error);
            }
        }
        addElement(elementType) {
            // TODO: Implementar adição de elemento
            console.log('Adding element:', elementType);
        }
        deleteElement(elementId) {
            if (this.debugMode) {
                console.log('🗑️ Deleting element:', elementId);
            }
            // Check if it's the form element
            if (this.formElement && this.formElement.id === elementId) {
                if (this.debugMode) {
                    console.log('🗑️ Deleting form element:', this.formElement.id);
                }
                this.formElement = null;
                this.propertyPanelInstance.hideProperties();
                this.render();
                this.emitFormChange();
                return;
            }
            // Remove from rows
            for (let i = 0; i < this.rows.length; i++) {
                const row = this.rows[i];
                if (!row)
                    continue;
                // Check if it's the row itself
                if (row.id === elementId) {
                    this.rows.splice(i, 1);
                    this.render();
                    this.emitFormChange();
                    return;
                }
                // Check columns in this row
                for (let j = 0; j < row.columns.length; j++) {
                    const column = row.columns[j];
                    if (!column)
                        continue;
                    // Check if it's the column itself
                    if (column.id === elementId) {
                        row.columns.splice(j, 1);
                        // Redistribute column widths
                        const newWidth = Math.floor(12 / Math.max(1, row.columns.length));
                        row.columns.forEach(col => col.width = newWidth);
                        this.render();
                        this.emitFormChange();
                        return;
                    }
                    // Check fields in this column
                    for (let k = 0; k < column.fields.length; k++) {
                        const field = column.fields[k];
                        if (!field)
                            continue;
                        if (field.id === elementId) {
                            column.fields.splice(k, 1);
                            this.render();
                            this.emitFormChange();
                            return;
                        }
                    }
                }
            }
        }
        exportForm() {
            return {
                formElement: this.formElement,
                rows: this.rows,
                metadata: {
                    title: 'Form Builder Layout',
                    description: 'Form layout created with Form Builder',
                    version: '0.1.0',
                    createdAt: new Date().toISOString()
                }
            };
        }
        importForm(data) {
            if (Array.isArray(data)) {
                // Legacy support - just rows
                this.rows = data;
                this.formElement = null;
            }
            else {
                // New format with form element
                this.formElement = data.formElement || null;
                this.rows = data.rows || [];
            }
            // Update auto-increment counters based on existing data
            this.updateCountersFromExistingData();
            this.render();
            this.emitFormChange();
        }
        /**
         * Export form to JSON and download it
         */
        exportJsonFile(filename) {
            try {
                const metadata = {
                    title: 'Form Builder Layout',
                    description: 'Form layout created with Form Builder',
                    version: '0.1.0',
                    createdAt: new Date().toISOString()
                };
                // Criar dados completos incluindo formElement
                const exportData = {
                    formElement: this.formElement,
                    rows: this.rows,
                    metadata
                };
                // Usar formato FormBuilderData completo
                const jsonString = JSON.stringify(exportData, null, 2);
                const blob = new Blob([jsonString], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = filename || 'form-layout.json';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
                if (this.debugMode) {
                    console.log('📥 Form exported to JSON:', {
                        hasFormElement: !!this.formElement,
                        rows: this.rows.length,
                        preview: JSONExporter.createPreview(this.rows)
                    });
                }
            }
            catch (error) {
                console.error('❌ Error exporting form:', error);
                alert('Error exporting form. Please check the console for details.');
            }
        }
        /**
         * Get form data as JSON object (for parent component to handle)
         * Following TypeScript convention: toJSON for serialization
         */
        toJSON() {
            try {
                const metadata = {
                    title: 'Form Builder Layout',
                    description: 'Form layout created with Form Builder',
                    createdAt: new Date().toISOString(),
                    version: '0.1.0'
                };
                const formData = {
                    metadata,
                    formElement: this.formElement,
                    rows: this.rows,
                    elementCount: this.getTotalElementCount(),
                    preview: JSONExporter.createPreview(this.rows)
                };
                // Dispatch event to notify parent that JSON data is ready
                this.dispatchJsonDataReadyEvent(formData);
                if (this.debugMode) {
                    console.log('📋 Form JSON data prepared:', {
                        hasFormElement: !!this.formElement,
                        rows: this.rows.length,
                        elements: formData.elementCount,
                        preview: formData.preview
                    });
                }
                return formData;
            }
            catch (error) {
                console.error('❌ Error preparing form JSON data:', error);
                throw error;
            }
        }
        /**
         * Load form data from JSON object
         * Following TypeScript convention: fromJSON for deserialization
         */
        fromJSON(jsonData) {
            try {
                // Validate the JSON structure
                if (!jsonData) {
                    throw new Error('JSON data is required');
                }
                let rows;
                let formElement = null;
                // Handle different JSON formats
                if (Array.isArray(jsonData)) {
                    // Direct array of rows (legacy format)
                    rows = jsonData;
                    formElement = null;
                }
                else if (jsonData.rows && Array.isArray(jsonData.rows)) {
                    // Full FormBuilderData object with metadata
                    rows = jsonData.rows;
                    formElement = jsonData.formElement || null;
                    if (this.debugMode) {
                        console.log('📥 Loading form with metadata:', {
                            version: jsonData.version,
                            metadata: jsonData.metadata,
                            hasFormElement: !!formElement,
                            rowCount: rows.length
                        });
                    }
                }
                else {
                    throw new Error('Invalid JSON format: expected array of rows or object with rows property');
                }
                // Basic validation - check if we have valid rows structure
                if (!Array.isArray(rows)) {
                    throw new Error('Invalid data: rows must be an array');
                }
                // Set the form data
                this.formElement = formElement;
                this.rows = rows;
                // Update element counters based on imported data
                this.updateCountersFromExistingData();
                // Clear selection and reset properties panel
                this.selectedElement = null;
                this.showNoSelectionPanel();
                // Re-render the form
                this.render();
                // Emit form change event
                this.emit('form:changed', this.rows);
                if (this.debugMode) {
                    console.log('✅ Form loaded from JSON:', {
                        rows: this.rows.length,
                        elements: this.getTotalElementCount(),
                        preview: JSONExporter.createPreview(this.rows)
                    });
                }
                // Dispatch event to notify parent
                this.dispatchFormImportedEvent(jsonData);
            }
            catch (error) {
                console.error('❌ Error loading form from JSON:', error);
                // Show user-friendly error
                const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
                alert(`Failed to load form: ${errorMessage}`);
                throw error;
            }
        }
        /**
         * Dispatch JSON data ready event to notify parent component
         */
        dispatchJsonDataReadyEvent(jsonData) {
            const event = new CustomEvent(FORM_BUILDER_EVENTS.JSON_DATA_READY, {
                detail: {
                    formBuilder: this,
                    jsonData,
                    timestamp: new Date().toISOString()
                },
                bubbles: true,
                cancelable: false
            });
            this.container.dispatchEvent(event);
            if (this.debugMode) {
                console.log('📤 JSON data ready event dispatched:', {
                    eventType: FORM_BUILDER_EVENTS.JSON_DATA_READY,
                    target: this.container,
                    dataSize: JSON.stringify(jsonData).length
                });
            }
        }
        /**
         * Get total count of all elements in the form
         */
        getTotalElementCount() {
            let count = 0;
            for (const row of this.rows) {
                for (const column of row.columns) {
                    count += column.fields.length;
                }
            }
            return count;
        }
        /**
         * Check if FormBuilder is fully loaded and ready
         */
        isFormBuilderLoaded() {
            return this.isLoaded;
        }
        /**
         * Get AstraFormBuilder instance (for parent component access)
         */
        getFormBuilderInstance() {
            return this;
        }
        /**
         * Show "no selection" state in properties panel
         */
        showNoSelectionPanel() {
            if (this.propertiesPanel) {
                this.propertiesPanel.innerHTML = `
                <h3>Properties</h3>
                <div class="properties-content">
                    <p class="no-selection">Select an element to edit its properties</p>
                </div>
            `;
            }
        }
        /**
         * Dispatch form imported event to notify parent component
         */
        dispatchFormImportedEvent(jsonData) {
            const event = new CustomEvent(FORM_BUILDER_EVENTS.FORM_IMPORTED, {
                detail: {
                    formBuilder: this,
                    importedData: jsonData,
                    timestamp: new Date().toISOString()
                },
                bubbles: true,
                cancelable: false
            });
            this.container.dispatchEvent(event);
            if (this.debugMode) {
                console.log('📥 Form imported event dispatched:', {
                    eventType: FORM_BUILDER_EVENTS.FORM_IMPORTED,
                    target: this.container,
                    dataSize: JSON.stringify(jsonData).length
                });
            }
        }
        /**
         * Import form from JSON file
         */
        async importFromJSON(file) {
            try {
                let fileToImport = file;
                if (!fileToImport) {
                    // Create temporary file input if no file provided
                    const input = document.createElement('input');
                    input.type = 'file';
                    input.accept = '.json';
                    input.style.display = 'none';
                    return new Promise((resolve, reject) => {
                        input.onchange = async (e) => {
                            const target = e.target;
                            document.body.removeChild(input);
                            if (target.files?.[0]) {
                                try {
                                    await this.importFromJSON(target.files[0]);
                                    resolve();
                                }
                                catch (error) {
                                    reject(error);
                                }
                            }
                            else {
                                reject(new Error('No file selected'));
                            }
                        };
                        input.oncancel = () => {
                            document.body.removeChild(input);
                            reject(new Error('File selection cancelled'));
                        };
                        document.body.appendChild(input);
                        input.click();
                    });
                }
                const text = await fileToImport.text();
                const importedData = JSONExporter.import(text);
                this.importForm(importedData);
                if (this.debugMode) {
                    const preview = Array.isArray(importedData)
                        ? JSONExporter.createPreview(importedData)
                        : JSONExporter.createPreview(importedData.rows);
                    console.log('📤 Form imported from JSON:', {
                        hasFormElement: Array.isArray(importedData) ? false : !!importedData.formElement,
                        rows: Array.isArray(importedData) ? importedData.length : importedData.rows.length,
                        preview
                    });
                }
                const previewText = Array.isArray(importedData)
                    ? JSONExporter.createPreview(importedData)
                    : JSONExporter.createPreview(importedData.rows);
                alert(`Form imported successfully! ${previewText}`);
            }
            catch (error) {
                console.error('❌ Error importing form:', error);
                alert('Error importing form. Please check the file format and try again.');
            }
        }
        /**
         * Clear the entire form
         */
        clearForm() {
            if (this.debugMode) {
                console.log('🗑️ Clear form called - current rows:', this.rows.length);
            }
            if (this.rows.length === 0) {
                alert('Form is already empty.');
                return;
            }
            const confirmed = confirm('Are you sure you want to clear the entire form? This action cannot be undone.');
            if (confirmed) {
                if (this.debugMode) {
                    console.log('🗑️ Clearing form - before clear:', {
                        rows: this.rows.length,
                        formElement: this.formElement?.id
                    });
                }
                this.rows = [];
                // Clear form element completely (set to null first, then recreate)
                this.formElement = null;
                // Reset auto-increment counters
                this.resetElementCounters();
                this.propertyPanelInstance.hideProperties();
                this.render();
                this.emitFormChange();
                if (this.debugMode) {
                    console.log('🗑️ Form cleared completely - no form element');
                }
            }
        }
        /**
         * Generate HTML form with specified framework
         */
        async generateHTML(framework = 'basic', options = {}) {
            const generator = new HTMLGenerator(framework);
            return generator.generateForm(this.rows, options);
        }
        /**
         * Generate HTML preview with specified framework
         */
        async generatePreview(framework = 'basic', options = {}) {
            const generator = new HTMLGenerator(framework);
            return generator.generatePreview(this.rows, options);
        }
        /**
         * Download HTML form as file
         */
        async downloadHTML(framework = 'basic', filename, options = {}) {
            try {
                const html = await this.generateHTML(framework, options);
                const blob = new Blob([html], { type: 'text/html' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = filename || `form-${framework}.html`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
                if (this.debugMode) {
                    console.log(`📥 HTML downloaded as ${framework} format:`, filename);
                }
            }
            catch (error) {
                console.error('❌ Error downloading HTML:', error);
                alert('Error generating HTML. Please try again.');
            }
        }
        /**
         * Download HTML preview as file
         */
        async downloadPreview(framework = 'basic', filename, options = {}) {
            try {
                const html = await this.generatePreview(framework, options);
                const blob = new Blob([html], { type: 'text/html' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = filename || `preview-${framework}.html`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
                if (this.debugMode) {
                    console.log(`📥 Preview downloaded as ${framework} format:`, filename);
                }
            }
            catch (error) {
                console.error('❌ Error downloading preview:', error);
                alert('Error generating preview. Please try again.');
            }
        }
        /**
         * PUBLIC API: Toggle debug mode
         */
        setDebugMode(enabled) {
            this.debugMode = enabled;
            if (this.debugMode) {
                console.log('🐛 Debug mode enabled');
            }
            else {
                console.log('✅ Debug mode disabled');
            }
        }
        /**
         * PUBLIC API: Get current form data
         */
        getFormData() {
            return JSON.parse(JSON.stringify(this.rows));
        }
        /**
         * PUBLIC API: Set form data
         */
        setFormData(rows) {
            this.rows = rows;
            this.render();
            this.propertyPanelInstance.hideProperties();
            this.emitFormChange();
        }
        /**
         * PUBLIC API: Add event listener for form changes
         */
        onFormChange(callback) {
            this.on('form-changed', callback);
        }
        /**
         * PUBLIC API: Remove event listener for form changes
         */
        offFormChange(callback) {
            this.off('form-changed', callback);
        }
        /**
         * Emit form change event
         */
        emitFormChange() {
            this.emit('form-changed', this.getFormData());
        }
        render() {
            const dropZone = this.scopedDOM.getElementById(this.scopedDOM.getScopedId('dropZone'));
            if (!dropZone)
                return;
            let contentHtml = '';
            // Render form element first if it exists
            if (this.formElement) {
                contentHtml += this.renderFormElementHtml();
            }
            if (this.rows.length === 0 && !this.formElement) {
                dropZone.innerHTML = `
                <div class="drop-zone-placeholder">
                    <p>Drag elements to create rows and columns</p>
                </div>
            `;
                // Add event listener for the button using scoped DOM
                const createRowBtn = dropZone.querySelector('#createRowBtn');
                if (createRowBtn) {
                    createRowBtn.addEventListener('click', () => {
                        console.log('Creating new row...');
                        this.createRow();
                    });
                }
                // Refresh drag and drop listeners (in case there are toolbox elements)
                this.dragDropManager.refresh();
                return;
            }
            // Render regular rows after form element
            if (this.rows.length > 0) {
                contentHtml += this.rows.map((row, index) => this.renderRowHtml(row, index)).join('');
            }
            // If only form element exists, show placeholder for content
            if (this.formElement && this.rows.length === 0) {
                contentHtml += `
                <div class="drop-zone-placeholder" style="margin-top: 1rem;">
                    <p>Drag elements to add form fields</p>
                </div>
            `;
            }
            dropZone.innerHTML = contentHtml;
            // Add event listeners for dynamically created elements
            this.attachRowEventListeners();
            // Refresh drag and drop listeners for new elements
            this.dragDropManager.refresh();
        }
        /**
         * Render the special form element HTML
         */
        renderFormElementHtml() {
            if (!this.formElement)
                return '';
            const debugInfo = this.debugMode ? ` (ID: ${this.formElement.id})` : '';
            const formTitle = this.formElement.properties?.name || 'Form';
            const formIcon = '📋';
            return `
            <div class="form-element-container" data-element-id="${this.formElement.id}" data-element-type="form">
                <div class="element-header">
                    <div class="header-left">
                        <span class="element-icon">${formIcon}</span>
                        <span class="element-title">${formTitle}${debugInfo}</span>
                    </div>
                    <div class="header-right">
                        <button class="header-btn delete-element-btn" data-element-id="${this.formElement.id}" data-element-type="form" title="Remove Form">
                            🗑️
                        </button>
                        <button class="header-btn settings-btn" data-element-id="${this.formElement.id}" title="Form Settings">
                            ⚙️
                        </button>
                    </div>
                </div>
                <div class="form-element-content">
                    <div class="form-element-preview">
                        <div class="form-element-icon">${formIcon}</div>
                        <div class="form-element-info">
                            <h4>${formTitle}</h4>
                            <div class="form-element-properties">
                                <span><strong>ID:</strong> ${this.formElement.properties?.id || 'form'}</span>
                                <span><strong>Name:</strong> ${this.formElement.properties?.name || '(not set)'}</span>
                                <span><strong>Method:</strong> ${this.formElement.properties?.method || 'post'}</span>
                                <span><strong>Action:</strong> ${this.formElement.properties?.action || '(not set)'}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        }
        renderRowHtml(row, rowIndex) {
            const columnsHtml = row.columns
                .map((column, colIndex) => this.renderColumnHtml(column, rowIndex, colIndex))
                .join('');
            const debugInfo = this.debugMode ? ` (ID: ${row.id})` : '';
            return `
            <div class="form-row drop-zone" data-row-id="${row.id}" data-element-id="${row.id}" data-element-type="row">
                <div class="element-header">
                    <div class="header-left">
                        <span class="element-icon">📐</span>
                        <span class="element-title">Linha (${rowIndex + 1})${debugInfo}</span>
                    </div>
                    <div class="header-right">
                        <button class="header-btn delete-element-btn" data-element-id="${row.id}" data-element-type="row" title="Excluir Linha">
                            🗑️
                        </button>
                        <button class="header-btn add-column-btn" data-row-id="${row.id}" title="Adicionar Coluna">
                            ➕
                        </button>
                        <button class="header-btn drag-handle-btn" data-element-id="${row.id}" data-element-type="row" title="Mover Linha" draggable="true">
                            🕹️
                        </button>
                    </div>
                </div>
                <div class="row-content">
                    ${columnsHtml}
                </div>
            </div>
        `;
        }
        renderColumnHtml(column, rowIndex, colIndex) {
            const fieldsHtml = column.fields.map((field, fieldIndex) => this.renderFieldHtml(field, rowIndex, colIndex, fieldIndex)).join('');
            const debugInfo = this.debugMode ? ` (${column.width}/12) - ID: ${column.id}` : '';
            return `
            <div class="form-column col-${column.width}" data-element-id="${column.id}" data-element-type="column">
                <div class="element-header">
                    <div class="header-left">
                        <span class="element-icon">📏</span>
                        <span class="element-title">Coluna (${rowIndex + 1},${colIndex + 1})${debugInfo}</span>
                    </div>
                    <div class="header-right">
                        <button class="header-btn delete-element-btn" data-element-id="${column.id}" data-element-type="column" title="Excluir Coluna">
                            🗑️
                        </button>
                        <button class="header-btn drag-handle-btn" data-element-id="${column.id}" data-element-type="column" title="Mover Coluna" draggable="true">
                            🕹️
                        </button>
                    </div>
                </div>
                <div class="column-content drop-zone-column">
                    ${fieldsHtml || '<div class="column-placeholder">Drop campos aqui</div>'}
                </div>
            </div>
        `;
        }
        renderFieldHtml(field, rowIndex, colIndex, fieldIndex) {
            const config = this.elementRegistry.get(field.elementRegistryId);
            if (!config)
                return '';
            const debugInfo = this.debugMode ? ` - ID: ${field.id}` : '';
            return `
            <div class="form-field" data-element-id="${field.id}" data-element-type="field">
                <div class="element-header">
                    <div class="header-left">
                        <span class="element-icon">${config.icon}</span>
                        <span class="element-title">${config.label} (${rowIndex + 1},${colIndex + 1},${fieldIndex + 1})${debugInfo}</span>
                    </div>
                    <div class="header-right">
                        <button class="header-btn delete-element-btn" data-element-id="${field.id}" data-element-type="field" title="Excluir Campo">
                            🗑️
                        </button>
                        <button class="header-btn settings-btn" data-element-id="${field.id}" title="Propriedades do Campo">
                            ⚙️
                        </button>
                        <button class="header-btn drag-handle-btn" data-element-id="${field.id}" data-element-type="field" title="Mover Campo" draggable="true">
                            🕹️
                        </button>
                    </div>
                </div>
                <div class="field-content">
                    ${this.generateFieldPreview(field, config)}
                </div>
            </div>
        `;
        }
        generateFieldPreview(field, config) {
            // Use PreviewRenderer to generate field preview
            // Logs mais detalhados
            console.log('🎨 =================================');
            console.log('🎨 generateFieldPreview CHAMADO!');
            console.log('🎨 Field ID:', field.id);
            console.log('🎨 Field Type:', field.htmlTag);
            console.log('🎨 Config encontrada:', !!config);
            console.log('🎨 PreviewRenderer existe:', !!this.previewRenderer);
            console.log('🎨 =================================');
            return this.previewRenderer.renderField(field, {
                includeLabels: true,
                includeWrapper: false // Don't include wrapper since we handle it in renderFieldHtml
            });
        }
        populateToolbox() {
            const elementsList = this.findById(this.scopedDOM.getScopedId('elementsList'));
            if (!elementsList)
                return;
            const elements = this.elementRegistry.getAll();
            // Group elements by category
            const categories = elements.reduce((acc, config) => {
                const category = config.category || 'other';
                if (!acc[category]) {
                    acc[category] = [];
                }
                acc[category].push(config);
                return acc;
            }, {});
            // Order categories
            const categoryOrder = ['layout', 'form', 'content', 'media', 'other'];
            const categoryLabels = {
                layout: 'Layout',
                form: 'Form Controls',
                content: 'Content',
                media: 'Media',
                other: 'Other'
            };
            elementsList.innerHTML = categoryOrder
                .filter(category => categories[category] && categories[category].length > 0)
                .map((category, index) => `
                <div class="elements-category">
                    <div class="category-header" data-category="${category}">
                        <span>${categoryLabels[category] || category}</span>
                        <span class="category-toggle expanded">▶</span>
                    </div>
                    <div class="elements-list expanded" data-category-content="${category}">
                        ${(categories[category] || []).map((config) => `
                            <div class="element-item" 
                                 data-element-type="${config.id}" 
                                 draggable="true"
                                 title="${config.label}">
                                <div class="element-icon">${config.icon}</div>
                                <div class="element-label">${config.label}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `).join('');
            // Add click handlers for category toggle
            this.setupCategoryToggle();
        }
        setupCategoryToggle() {
            const categoryHeaders = this.findElements('.category-header');
            categoryHeaders.forEach(header => {
                header.addEventListener('click', (e) => {
                    const category = header.getAttribute('data-category');
                    const toggleIcon = header.querySelector('.category-toggle');
                    const elementsList = this.findElement(`[data-category-content="${category}"]`);
                    if (elementsList && toggleIcon) {
                        const isExpanded = toggleIcon.classList.contains('expanded');
                        if (isExpanded) {
                            // Collapse
                            toggleIcon.classList.remove('expanded');
                            elementsList.classList.remove('expanded');
                        }
                        else {
                            // Expand
                            toggleIcon.classList.add('expanded');
                            elementsList.classList.add('expanded');
                        }
                    }
                });
            });
        }
        clear() {
            this.rows = [];
            this.render();
        }
        createRow() {
            const rowId = this.generateUniqueId('row');
            const columnId = this.generateUniqueId('column');
            const newRow = {
                id: rowId,
                columns: [{
                        id: columnId,
                        width: 12, // Full width initially
                        fields: [],
                        properties: { id: columnId }
                    }],
                properties: { id: rowId }
            };
            this.rows.push(newRow);
            this.render();
            console.log('Row created, total rows:', this.rows.length);
        }
        // Test method to verify if the method is accessible
        testAddColumn() {
            console.log('testAddColumn called');
            if (this.rows.length > 0 && this.rows[0]) {
                console.log('Testing with first row:', this.rows[0].id);
                this.addColumnToRowById(this.rows[0].id);
            }
            else {
                console.log('No rows available for testing');
            }
        }
        addColumnToRow() {
            if (this.rows.length === 0) {
                this.createRow();
                return;
            }
            // Add to first row for now (later we can make it more sophisticated)
            const row = this.rows[0];
            if (!row)
                return;
            const columnId = this.generateUniqueId('column');
            const newColumn = {
                id: columnId,
                width: Math.floor(12 / (row.columns.length + 1)), // Distribute width evenly
                fields: [],
                properties: { id: columnId }
            };
            // Adjust existing columns width
            const newWidth = Math.floor(12 / (row.columns.length + 1));
            row.columns.forEach(col => col.width = newWidth);
            row.columns.push(newColumn);
            this.render();
        }
        createField(elementType) {
            // Add field to first available column
            if (this.rows.length === 0) {
                this.createRow();
            }
            const row = this.rows[0];
            if (!row || row.columns.length === 0)
                return;
            const column = row.columns[0];
            if (!column)
                return;
            const config = this.elementRegistry.get(elementType);
            if (!config)
                return;
            // Extract properties with defaultValues
            const properties = {};
            if (config.properties) {
                for (const [key, propDef] of Object.entries(config.properties)) {
                    properties[key] = propDef.defaultValue || '';
                }
            }
            // Extract meta with defaultValues
            const meta = {};
            if (config.meta) {
                for (const [key, propDef] of Object.entries(config.meta)) {
                    meta[key] = propDef.defaultValue || '';
                }
            }
            // Debug log for meta extraction
            if (elementType === 'h1') {
                console.log('Creating H1 field with meta:', {
                    configMeta: config.meta,
                    extractedMeta: meta,
                    metaKeys: Object.keys(meta)
                });
            }
            // Extract events with defaultValues
            const events = {};
            if (config.events) {
                for (const [key, propDef] of Object.entries(config.events)) {
                    events[key] = propDef.defaultValue || { action: '', target: 'vanilla', parameters: {} };
                }
            }
            // Extract alpine attributes with defaultValues
            const alpine = {};
            if (config.alpine) {
                for (const [key, propDef] of Object.entries(config.alpine)) {
                    alpine[key] = propDef.defaultValue || '';
                }
            }
            const fieldId = Utils.generateId(); // Keep original unique ID for field instance
            const autoIncrementId = this.generateUniqueId(elementType); // Generate slug-format ID for properties
            // For form elements, set meta.label to the generated ID
            if (this.isFormElement(elementType) && config.meta?.label) {
                meta.label = autoIncrementId;
            }
            const newField = {
                id: fieldId, // Original unique ID for internal tracking
                elementRegistryId: elementType, // Store the original element registry ID
                htmlTag: config.htmlTag,
                properties: {
                    ...properties,
                    id: autoIncrementId, // Auto-increment slug ID for properties
                    name: config.properties?.name ? autoIncrementId : undefined // Use same value for name if name property exists
                },
                meta: meta,
                events: events,
                alpine: alpine
            };
            column.fields.push(newField);
            this.render();
        }
        moveElement(elementId, position) {
            // TODO: Implement element moving
            console.log('Moving element:', elementId, position);
        }
        renderRow(element) {
            // Re-render the specific row/column/field
            this.render(); // For now, re-render everything
        }
        attachRowEventListeners() {
            console.log('Attaching row event listeners...');
            // Remove previous canvas click handler if exists
            if (this.canvasClickHandler) {
                this.scopedDOM.removeEventListener('click', this.canvasClickHandler);
            }
            // Create new canvas click handler using scoped DOM
            this.canvasClickHandler = (e) => {
                const target = e.target;
                // Check if the target or its parent is the add column button
                const button = target.closest('.add-column-btn');
                if (button) {
                    console.log('Add column button clicked!', button);
                    if (this.debugMode)
                        console.log('Adding column to row');
                    e.preventDefault();
                    e.stopPropagation();
                    const rowId = button.dataset.rowId;
                    if (rowId) {
                        this.addColumnToRowById(rowId);
                    }
                    else {
                        console.error('No rowId found in button dataset');
                    }
                }
                else {
                    // Check for other buttons using closest()
                    const deleteBtn = target.closest('.delete-element-btn');
                    const settingsBtn = target.closest('.settings-btn');
                    if (deleteBtn) {
                        e.preventDefault();
                        const elementId = deleteBtn.dataset.elementId;
                        if (elementId) {
                            this.deleteElement(elementId);
                        }
                    }
                    else if (settingsBtn) {
                        e.preventDefault();
                        const elementId = settingsBtn.dataset.elementId;
                        if (elementId) {
                            this.selectElement(elementId);
                        }
                    }
                    else {
                        // Check if clicked on an element for selection
                        const element = target.closest('[data-element-id]');
                        if (element) {
                            const elementType = element.dataset.elementType;
                            // Don't select empty columns or dropable areas
                            if (element.classList.contains('form-column') ||
                                element.classList.contains('column-placeholder') ||
                                element.classList.contains('form-column-placeholder')) {
                                return; // Ignore clicks on empty columns/dropables
                            }
                            // For fields, always open properties panel on click
                            if (elementType === 'field') {
                                e.preventDefault();
                                this.selectElement(element.dataset.elementId);
                            }
                            // For form element, also open properties panel on click
                            else if (elementType === 'form') {
                                e.preventDefault();
                                this.selectElement(element.dataset.elementId);
                            }
                            // For rows and columns, also allow selection but without preventing default
                            else if (elementType === 'row' || elementType === 'column') {
                                this.selectElement(element.dataset.elementId);
                            }
                        }
                    }
                }
            };
            // Add the new event listener using scoped DOM
            this.scopedDOM.addEventListener('click', this.canvasClickHandler);
            // Also add direct event listeners to add-column buttons for better reliability
            const addColumnButtons = this.scopedDOM.querySelectorAll('.add-column-btn');
            addColumnButtons.forEach(button => {
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const rowId = button.dataset.rowId;
                    if (rowId) {
                        this.addColumnToRowById(rowId);
                    }
                });
            });
        }
        // Public methods that can be called from the HTML
        addColumnToRowById(rowId) {
            console.log('addColumnToRowById called with rowId:', rowId);
            const row = this.rows.find(r => r.id === rowId);
            if (!row) {
                console.warn('Row not found:', rowId);
                console.log('Available rows:', this.rows.map(r => r.id));
                return;
            }
            console.log('Row found:', row);
            // Check if adding another column would exceed 12 columns
            if (row.columns.length >= 12) {
                console.warn('Cannot add more than 12 columns to a row');
                alert('Não é possível adicionar mais de 12 colunas em uma linha!');
                return;
            }
            const currentColumnCount = row.columns.length;
            const totalColumns = currentColumnCount + 1;
            const baseWidth = Math.floor(12 / totalColumns);
            const remainder = 12 % totalColumns;
            console.log(`Adding column to row ${rowId}. Current: ${currentColumnCount}, New total: ${totalColumns}`);
            // Create new column
            const columnId = this.generateUniqueId('column');
            const newColumn = {
                id: columnId,
                width: baseWidth + (currentColumnCount < remainder ? 1 : 0),
                fields: [],
                properties: { id: columnId }
            };
            console.log('New column created:', newColumn);
            // Redistribute widths for existing columns
            row.columns.forEach((col, index) => {
                col.width = baseWidth + (index < remainder ? 1 : 0);
            });
            row.columns.push(newColumn);
            console.log(`Column added successfully. Row ${rowId} now has ${row.columns.length} columns`);
            // Force re-render
            this.render();
            console.log('Re-render completed');
        }
        selectElement(elementId) {
            // Check if it's the form element
            if (this.formElement && this.formElement.id === elementId) {
                this.selectedElement = this.formElement;
                const config = this.elementRegistry.get('form');
                if (config) {
                    this.propertyPanelInstance.showProperties(this.formElement, config, 'form');
                }
                return;
            }
            // Find the element in rows, columns, or fields
            let foundElement = null;
            for (const row of this.rows) {
                if (row.id === elementId) {
                    foundElement = row;
                    break;
                }
                for (const column of row.columns) {
                    if (column.id === elementId) {
                        foundElement = column;
                        break;
                    }
                    for (const field of column.fields) {
                        if (field.id === elementId) {
                            foundElement = field;
                            break;
                        }
                    }
                    if (foundElement)
                        break;
                }
                if (foundElement)
                    break;
            }
            if (foundElement) {
                this.selectedElement = foundElement;
                // Get element config for property panel
                let elementType = '';
                if ('elementRegistryId' in foundElement && foundElement.elementRegistryId) {
                    elementType = foundElement.elementRegistryId;
                }
                else if ('columns' in foundElement) {
                    elementType = 'row';
                }
                else if ('fields' in foundElement) {
                    elementType = 'column';
                }
                const config = this.elementRegistry.get(elementType);
                if (config) {
                    const elementTypeEnum = elementType === 'row' ? 'row' :
                        elementType === 'column' ? 'column' : 'field';
                    // Debug log for content elements
                    if (config.category === 'content') {
                        console.log('=== FormBuilder selecting content element ===');
                        console.log('ElementType:', elementType);
                        console.log('ElementTypeEnum:', elementTypeEnum);
                        console.log('Config category:', config.category);
                        console.log('Config has meta:', !!config.meta);
                        console.log('Meta keys:', config.meta ? Object.keys(config.meta) : 'none');
                    }
                    this.propertyPanelInstance.showProperties(foundElement, config, elementTypeEnum);
                }
            }
            else {
                console.warn('Element not found:', elementId);
            }
        }
        // Make createElement public for HTML buttons
        createElement(elementType, position) {
            return this.createElementPrivate(elementType, position);
        }
        createElementPrivate(elementType, position) {
            console.log('Creating element:', elementType);
            const config = this.elementRegistry.get(elementType);
            if (!config) {
                console.error('Element type not found:', elementType);
                return;
            }
            if (elementType === 'row') {
                this.createRow();
            }
            else if (elementType === 'column') {
                // Adicionar coluna à linha selecionada ou primeira linha
                this.addColumnToRow();
            }
            else {
                // Create field in a column
                this.createField(elementType);
            }
        }
        // Movement methods for internal drag and drop
        moveRow(rowId, target, event) {
            if (this.debugMode)
                console.log('Moving row:', rowId);
            // Find the row to move
            const rowIndex = this.rows.findIndex(r => r.id === rowId);
            if (rowIndex === -1) {
                console.warn('Row not found for moving:', rowId);
                return;
            }
            const rowToMove = this.rows[rowIndex];
            if (!rowToMove)
                return;
            // Check if dropping on canvas (empty area)
            const canvas = target.closest('.form-canvas');
            const targetRow = target.closest('.form-row');
            if (canvas && !targetRow) {
                // Dropping on empty canvas area
                const canvasRect = canvas.getBoundingClientRect();
                const mouseY = event?.clientY || 0;
                const canvasHeight = canvasRect.height;
                const relativeY = mouseY - canvasRect.top;
                // Remove row from current position
                this.rows.splice(rowIndex, 1);
                // Determine position based on where on canvas it was dropped
                let insertIndex = 0;
                if (relativeY > canvasHeight * 0.8) {
                    // Bottom 20% - add to end
                    insertIndex = this.rows.length;
                }
                else if (relativeY < canvasHeight * 0.2) {
                    // Top 20% - add to beginning
                    insertIndex = 0;
                }
                else {
                    // Middle - add in the middle
                    insertIndex = Math.floor(this.rows.length / 2);
                }
                this.rows.splice(insertIndex, 0, rowToMove);
                this.render();
                this.emitFormChange();
                if (this.debugMode)
                    console.log(`Row moved to canvas position ${insertIndex}`);
                return;
            }
            if (targetRow) {
                const targetRowId = targetRow.dataset.rowId;
                const targetIndex = this.rows.findIndex(r => r.id === targetRowId);
                if (targetIndex !== -1 && targetIndex !== rowIndex) {
                    // Remove row from current position
                    this.rows.splice(rowIndex, 1);
                    // Adjust target index if we removed an element before it
                    const adjustedIndex = rowIndex < targetIndex ? targetIndex - 1 : targetIndex;
                    // Determine position based on mouse position relative to target row
                    let insertIndex = adjustedIndex;
                    if (event) {
                        const rect = targetRow.getBoundingClientRect();
                        const mouseY = event.clientY;
                        const rowHeight = rect.height;
                        const relativeY = mouseY - rect.top;
                        if (relativeY < rowHeight * 0.3) {
                            // Top 30% - insert before
                            insertIndex = adjustedIndex;
                        }
                        else if (relativeY > rowHeight * 0.7) {
                            // Bottom 30% - insert after
                            insertIndex = adjustedIndex + 1;
                        }
                        else {
                            // Middle 40% - replace position
                            insertIndex = adjustedIndex;
                        }
                    }
                    // Insert at new position
                    this.rows.splice(insertIndex, 0, rowToMove);
                    this.render();
                    this.emitFormChange();
                    if (this.debugMode)
                        console.log(`Row moved from index ${rowIndex} to ${insertIndex}`);
                }
            }
        }
        moveColumn(columnId, target) {
            if (this.debugMode)
                console.log('Moving column:', columnId);
            // Find the column to move
            let sourceRow = null;
            let sourceColumnIndex = -1;
            let columnToMove = null;
            for (const row of this.rows) {
                const colIndex = row.columns.findIndex(c => c.id === columnId);
                if (colIndex !== -1) {
                    sourceRow = row;
                    sourceColumnIndex = colIndex;
                    const foundColumn = row.columns[colIndex];
                    if (foundColumn) {
                        columnToMove = foundColumn;
                    }
                    break;
                }
            }
            if (!columnToMove || !sourceRow) {
                console.warn('Column not found for moving:', columnId);
                return;
            }
            const targetColumn = target.closest('.form-column');
            const targetRow = target.closest('.form-row');
            if (targetColumn) {
                // Move to position relative to another column
                const targetColumnId = targetColumn.dataset.elementId;
                // Find target column's row and position
                for (const row of this.rows) {
                    const targetColIndex = row.columns.findIndex(c => c.id === targetColumnId);
                    if (targetColIndex !== -1) {
                        // Remove from source
                        sourceRow.columns.splice(sourceColumnIndex, 1);
                        // Determine insert position based on mouse position
                        const rect = targetColumn.getBoundingClientRect();
                        const mouseX = event instanceof DragEvent ? event.clientX : 0;
                        const insertAfter = mouseX > rect.left + rect.width / 2;
                        const insertIndex = insertAfter ? targetColIndex + 1 : targetColIndex;
                        // Insert at new position
                        row.columns.splice(insertIndex, 0, columnToMove);
                        // Redistribute column widths in both rows
                        this.redistributeColumnWidths(sourceRow);
                        if (row !== sourceRow) {
                            this.redistributeColumnWidths(row);
                        }
                        this.render();
                        if (this.debugMode)
                            console.log(`Column moved to row ${row.id} at index ${insertIndex}`);
                        break;
                    }
                }
            }
            else if (targetRow) {
                // Move to the end of another row
                const targetRowId = targetRow.dataset.rowId;
                const targetRowObj = this.rows.find(r => r.id === targetRowId);
                if (targetRowObj && targetRowObj !== sourceRow) {
                    // Remove from source
                    sourceRow.columns.splice(sourceColumnIndex, 1);
                    // Add to target row
                    targetRowObj.columns.push(columnToMove);
                    // Redistribute column widths in both rows
                    this.redistributeColumnWidths(sourceRow);
                    this.redistributeColumnWidths(targetRowObj);
                    this.render();
                    if (this.debugMode)
                        console.log(`Column moved to end of row ${targetRowId}`);
                }
            }
        }
        moveField(fieldId, target) {
            if (this.debugMode)
                console.log('Moving field:', fieldId);
            // Find the field to move
            let sourceColumn = null;
            let sourceFieldIndex = -1;
            let fieldToMove = null;
            for (const row of this.rows) {
                for (const column of row.columns) {
                    const fieldIndex = column.fields.findIndex(f => f.id === fieldId);
                    if (fieldIndex !== -1) {
                        sourceColumn = column;
                        sourceFieldIndex = fieldIndex;
                        const foundField = column.fields[fieldIndex];
                        if (foundField) {
                            fieldToMove = foundField;
                        }
                        break;
                    }
                }
                if (fieldToMove)
                    break;
            }
            if (!fieldToMove || !sourceColumn) {
                console.warn('Field not found for moving:', fieldId);
                return;
            }
            const targetColumn = target.closest('.form-column');
            if (targetColumn) {
                const targetColumnId = targetColumn.dataset.elementId;
                // Find target column
                for (const row of this.rows) {
                    for (const column of row.columns) {
                        if (column.id === targetColumnId) {
                            // Remove from source
                            sourceColumn.fields.splice(sourceFieldIndex, 1);
                            // Add to target column
                            column.fields.push(fieldToMove);
                            this.render();
                            if (this.debugMode)
                                console.log(`Field moved to column ${targetColumnId}`);
                            return;
                        }
                    }
                }
            }
        }
        redistributeColumnWidths(row) {
            const columnCount = row.columns.length;
            if (columnCount === 0)
                return;
            const baseWidth = Math.floor(12 / columnCount);
            const remainder = 12 % columnCount;
            row.columns.forEach((col, index) => {
                col.width = baseWidth + (index < remainder ? 1 : 0);
            });
        }
        /**
         * Public methods for container scoping and security
         */
        /**
         * Get debug information about the FormBuilder scope
         */
        getScopeDebugInfo() {
            return {
                ...this.scopedDOM.getDebugInfo(),
                formBuilderInfo: {
                    rowsCount: this.rows.length,
                    totalElements: this.getTotalElementCount(),
                    isLoaded: this.isLoaded,
                    debugMode: this.debugMode
                }
            };
        }
        /**
         * Validate if an element is within the FormBuilder's scope
         */
        isElementInScope(element) {
            return this.scopedDOM.isInScope(element);
        }
        /**
         * Get the container element
         */
        getContainer() {
            return this.scopedDOM.getContainer();
        }
        /**
         * Get the scope ID for this FormBuilder instance
         */
        getScopeId() {
            return this.scopedDOM.getScopeId();
        }
        /**
         * Cleanup method - call when destroying the FormBuilder instance
         */
        destroy() {
            // Cleanup scoped DOM manager
            this.scopedDOM.cleanup();
            // Clear internal state
            this.rows = [];
            this.selectedElement = null;
            this.isLoaded = false;
            // Remove FormBuilder-specific classes and attributes
            this.container.removeAttribute('data-formbuilder-scope');
            this.container.removeAttribute('data-fb-version');
            this.container.removeAttribute('data-fb-initialized');
            console.log('🧹 FormBuilder destroyed and cleaned up');
        }
    }

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
    /**
     * Library version
     */
    const VERSION = '0.1.0';
    /**
     * Library metadata
     */
    const LIBRARY_INFO = {
        name: 'AstraSmartForm',
        version: VERSION,
        description: 'Professional drag-and-drop form builder with TypeScript support by Astra Dev',
        author: 'Astra Dev',
        license: 'MIT',
        repository: 'https://github.com/astradevio/astra-smartform',
        documentation: 'https://docs.astradev.io/smartform'
    };

    exports.AstraFormBuilder = AstraFormBuilder;
    exports.BaseRenderer = BaseRenderer;
    exports.BasicRenderer = BasicRenderer;
    exports.BootstrapRenderer = BootstrapRenderer;
    exports.DragDropManager = DragDropManager;
    exports.ElementRegistry = ElementRegistry;
    exports.FormBuilder = AstraFormBuilder;
    exports.JSONExporter = JSONExporter;
    exports.LIBRARY_INFO = LIBRARY_INFO;
    exports.PreviewRenderer = PreviewRenderer;
    exports.PropertyPanel = PropertyPanel;
    exports.RendererFactory = RendererFactory;
    exports.ScopedDOMManager = ScopedDOMManager;
    exports.TailwindRenderer = TailwindRenderer;
    exports.Utils = Utils;
    exports.VERSION = VERSION;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=astra-form-builder.bundle.js.map
