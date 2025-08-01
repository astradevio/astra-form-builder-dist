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

class ElementRegistry {
    constructor() {
        this.elements = new Map();
        this.initializeDefaultElements();
    }
    getStandardMeta(customMeta = {}) {
        return { ...ElementRegistry.STANDARD_META, ...customMeta };
    }
    getStandardEvents(customEvents = {}) {
        return { ...ElementRegistry.STANDARD_EVENTS, ...customEvents };
    }
    getStandardAlpine(customAlpine = {}) {
        return { ...ElementRegistry.STANDARD_ALPINE, ...customAlpine };
    }
    initializeDefaultElements() {
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
    register(config) {
        this.elements.set(config.id, config);
    }
    unregister(id) {
        this.elements.delete(id);
    }
    get(id) {
        return this.elements.get(id);
    }
    getAll() {
        return Array.from(this.elements.values());
    }
    getByCategory(category) {
        return this.getAll().filter(element => element.category === category);
    }
    has(id) {
        return this.elements.has(id);
    }
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
                if (config.properties && typeof config.properties !== 'object') {
                    throw new Error(`Element "${id}": Properties must be an object`);
                }
                if (config.meta && typeof config.meta !== 'object') {
                    throw new Error(`Element "${id}": Meta must be an object`);
                }
                if (config.events && typeof config.events !== 'object') {
                    throw new Error(`Element "${id}": Events must be an object`);
                }
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
    loadCustomRegistry(registry) {
        if (!ElementRegistry.validateRegistry(registry)) {
            throw new Error('Invalid registry configuration');
        }
        this.elements.clear();
        for (const config of Object.values(registry)) {
            this.register(config);
        }
    }
    toJSON() {
        const result = {};
        for (const [id, config] of this.elements) {
            result[id] = config;
        }
        return result;
    }
}
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

class PropertyPanel extends SimpleEventEmitter {
    constructor(container) {
        super();
        this.container = container;
        this.currentElement = null;
        this.currentConfig = null;
        this.currentElementType = null;
    }
    canHaveExtendedProperties(element, config) {
        if (this.currentElementType === 'row' || this.currentElementType === 'column') {
            return false;
        }
        if (this.currentElementType === 'form') {
            return true;
        }
        if (this.currentElementType === 'field') {
            return true;
        }
        return config && (config.category === 'form' || config.category === 'content');
    }
    showProperties(element, config, elementType) {
        this.currentElement = element;
        this.currentConfig = config;
        this.currentElementType = elementType;
        console.log('=== PropertyPanel Debug ===');
        console.log('Element:', element);
        console.log('Config:', config);
        console.log('Element Type:', elementType);
        console.log('Config Category:', config.category);
        console.log('Can have extended props:', this.canHaveExtendedProperties(element, config));
        console.log('Meta config keys:', config.meta ? Object.keys(config.meta) : 'No meta');
        this.render();
    }
    hideProperties() {
        this.currentElement = null;
        this.currentConfig = null;
        this.container.innerHTML = '<p class="no-selection">Select an element to edit its properties</p>';
    }
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
        console.log('PropertyPanel groups before filter:', groups.map(g => ({
            key: g.key,
            configKeys: Object.keys(g.config),
            hasConfig: Object.keys(g.config).length > 0
        })));
        console.log('Element category:', this.currentConfig.category);
        console.log('Can have extended properties:', this.currentElement && this.currentConfig &&
            this.canHaveExtendedProperties(this.currentElement, this.currentConfig));
        return groups
            .filter(group => Object.keys(group.config).length > 0)
            .map(group => this.renderPropertyGroup(group.key, group.label, group.icon, group.config))
            .join('');
    }
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
    renderProperties() {
        if (!this.currentConfig || !this.currentElement) {
            return '';
        }
        return Object.entries(this.currentConfig.properties || {})
            .map(([key, config]) => this.renderPropertyField(key, config, 'properties'))
            .join('');
    }
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
    attachEventListeners() {
        if (!this.currentConfig || !this.currentElement) {
            return;
        }
        this.container.querySelectorAll('.group-header').forEach(header => {
            header.addEventListener('click', (e) => {
                const groupKey = e.currentTarget.dataset.group;
                if (groupKey) {
                    this.toggleGroup(groupKey);
                }
            });
        });
        const groups = ['properties', 'meta', 'events', 'alpine'];
        groups.forEach(groupKey => {
            const config = this.getGroupConfig(groupKey);
            if (config) {
                Object.keys(config).forEach(key => {
                    const propertyConfig = config[key];
                    if (propertyConfig.type === 'fixed') {
                        return;
                    }
                    const input = this.container.querySelector(`#prop_${groupKey}_${key}`);
                    if (input) {
                        const debouncedUpdate = Utils.debounce(() => {
                            this.updateProperty(key, this.getInputValue(input), groupKey);
                        }, 150);
                        input.addEventListener('input', debouncedUpdate);
                        input.addEventListener('change', () => {
                            this.updateProperty(key, this.getInputValue(input), groupKey);
                        });
                    }
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
                            actionInput.addEventListener('change', updateEvent);
                            targetInput.addEventListener('change', updateEvent);
                        }
                    }
                });
            }
        });
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
    toggleGroup(groupKey) {
        const content = this.container.querySelector(`#group-${groupKey}`);
        const toggle = this.container.querySelector(`[data-group="${groupKey}"] .group-toggle`);
        if (content && toggle) {
            const isExpanded = content.style.display !== 'none';
            content.style.display = isExpanded ? 'none' : 'block';
            toggle.textContent = isExpanded ? '▶' : '▼';
        }
    }
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
    updateProperty(key, value, groupKey = 'properties') {
        if (!this.currentElement || !this.currentConfig) {
            return;
        }
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
    getCurrentElement() {
        return this.currentElement;
    }
}

class DragDropManager extends SimpleEventEmitter {
    constructor(container, scopedDOM) {
        super();
        this.container = container;
        this.scopedDOM = scopedDOM;
        this.draggedData = null;
        setTimeout(() => {
            this.initializeDragAndDrop();
        }, 100);
    }
    initializeDragAndDrop() {
        this.setupDropZones();
    }
    setupDropZones() {
        const addScopedListener = (event, handler) => {
            if (this.scopedDOM) {
                this.scopedDOM.addEventListener(event, handler);
            }
            else {
                this.container.addEventListener(event, handler);
            }
        };
        addScopedListener('dragstart', (e) => {
            const event = e;
            const target = event.target;
            if (this.scopedDOM && !this.scopedDOM.validateOperation(target, 'dragstart')) {
                event.preventDefault();
                return;
            }
            this.handleDragStart(event, target);
        });
        addScopedListener('dragover', (e) => {
            const event = e;
            const target = event.target;
            if (this.scopedDOM && !this.scopedDOM.validateOperation(target, 'dragover')) {
                return;
            }
            this.handleDragOver(event, target);
        });
        addScopedListener('dragleave', (e) => {
            const event = e;
            const target = event.target;
            if (this.scopedDOM && !this.scopedDOM.validateOperation(target, 'dragleave')) {
                return;
            }
            this.handleDragLeave(event, target);
        });
        addScopedListener('drop', (e) => {
            const event = e;
            const target = event.target;
            if (this.scopedDOM && !this.scopedDOM.validateOperation(target, 'drop')) {
                return;
            }
            this.handleDrop(event, target);
        });
        addScopedListener('dragend', (e) => {
            const event = e;
            const target = event.target;
            if (this.scopedDOM && !this.scopedDOM.validateOperation(target, 'dragend')) {
                return;
            }
            this.handleDragEnd(event, target);
        });
    }
    handleDragStart(e, target) {
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
        const dragHandle = target.closest('.drag-handle-btn');
        if (dragHandle) {
            const elementId = dragHandle.dataset.elementId;
            const elementType = dragHandle.dataset.elementType;
            if (elementId && elementType) {
                this.draggedData = {
                    elementType,
                    elementId,
                    isNew: false,
                    sourceType: elementType
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
    handleDragLeave(e, target) {
        const dropZone = target.closest('.drop-zone');
        if (dropZone) {
            const rect = dropZone.getBoundingClientRect();
            const x = e.clientX;
            const y = e.clientY;
            if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
                dropZone.classList.remove('drag-over');
            }
        }
    }
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
    handleDragEnd(e, target) {
        const scopeContainer = this.scopedDOM?.getContainer() || this.container;
        scopeContainer.querySelectorAll('.drag-over').forEach(el => {
            el.classList.remove('drag-over');
        });
        this.clearDraggedData();
    }
    clearDraggedData() {
        this.draggedData = null;
    }
    getDraggedData() {
        return this.draggedData;
    }
    setDraggedData(data) {
        this.draggedData = data;
    }
    isDragging() {
        return this.draggedData !== null;
    }
    reset() {
        this.clearDraggedData();
        const scopeContainer = this.scopedDOM?.getContainer() || this.container;
        scopeContainer.querySelectorAll('.drag-over, .dragging').forEach(el => {
            el.classList.remove('drag-over', 'dragging');
        });
    }
    refresh() {
    }
}

class JSONExporter {
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
        if ('formElement' in data || ('metadata' in data && !('version' in data))) {
            const formBuilderData = data;
            if (!Array.isArray(formBuilderData.rows)) {
                throw new Error('Invalid form data structure: rows must be an array');
            }
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
        const legacyData = data;
        if (!legacyData.version || !Array.isArray(legacyData.rows)) {
            throw new Error('Invalid form data structure');
        }
        if (legacyData.version !== this.VERSION) {
            console.warn(`Form data version ${legacyData.version} may not be fully compatible with current version ${this.VERSION}`);
        }
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

const FORM_CONTROL_TAGS = [
    'input', 'textarea', 'select', 'button'
];
const LAYOUT_ELEMENT_TAGS = [
    'div', 'section', 'fieldset', 'form'
];
const CONTENT_ELEMENT_TAGS = [
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'hr'
];
const MEDIA_ELEMENT_TAGS = [
    'img', 'video', 'audio'
];
const ELEMENT_CATEGORIES = {
    FORM: 'form',
    LAYOUT: 'layout',
    CONTENT: 'content',
    MEDIA: 'media'
};
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
class ElementTypeUtils {
    static isFormControl(htmlTag) {
        return FORM_CONTROL_TAGS.includes(htmlTag);
    }
    static isLayoutElement(htmlTag) {
        return LAYOUT_ELEMENT_TAGS.includes(htmlTag);
    }
    static isContentElement(htmlTag) {
        return CONTENT_ELEMENT_TAGS.includes(htmlTag);
    }
    static isMediaElement(htmlTag) {
        return MEDIA_ELEMENT_TAGS.includes(htmlTag);
    }
    static supportsMetaLabel(fieldType) {
        return ElementTypeUtils.isFormControl(fieldType);
    }
    static supportsValidation(fieldType) {
        return ElementTypeUtils.isFormControl(fieldType) && fieldType !== 'button';
    }
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
    static supportsOptions(fieldType) {
        return ['select', 'radio', 'radio-group', 'checkbox-group'].includes(fieldType);
    }
    static getHtmlInputType(fieldType) {
        return HTML_INPUT_TYPE_MAP[fieldType] || 'text';
    }
    static getDefaultPlaceholder(fieldType) {
        return DEFAULT_PLACEHOLDERS[fieldType] || '';
    }
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
    static isValidElementType(elementType) {
        return ElementTypeUtils.isFormControl(elementType) ||
            ElementTypeUtils.isLayoutElement(elementType) ||
            ElementTypeUtils.isContentElement(elementType) ||
            ElementTypeUtils.isMediaElement(elementType);
    }
    static getAllFormControlTags() {
        return FORM_CONTROL_TAGS;
    }
    static getAllLayoutElementTags() {
        return LAYOUT_ELEMENT_TAGS;
    }
    static requiresNameAttribute(htmlTag) {
        return ElementTypeUtils.isFormControl(htmlTag) && htmlTag !== 'button';
    }
    static canBeRequired(fieldType) {
        return ElementTypeUtils.supportsValidation(fieldType);
    }
}

class PreviewRenderer extends BaseRenderer {
    renderField(field, options = {}) {
        const { includeLabels = true, includeWrapper = true } = options;
        let html = '';
        if (includeWrapper) {
            html += '<div class="preview-field">\n';
        }
        if (includeLabels && field.meta?.label && this.isFormControl(field.htmlTag)) {
            const isRequired = field.properties.required;
            html += `  <div class="field-preview-label">`;
            html += this.escapeHtml(field.meta.label);
            if (isRequired) {
                html += ' <span class="required">*</span>';
            }
            html += '</div>\n';
        }
        switch (field.htmlTag) {
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
        if (field.meta && field.meta.helperText) {
            html += `  <div class="preview-help">${this.escapeHtml(field.meta.helperText)}</div>\n`;
        }
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

class BasicRenderer extends BaseRenderer {
    renderField(field, options = {}) {
        const { includeLabels = true } = options;
        const fieldId = this.getFieldId(field);
        this.getFieldName(field);
        const label = this.getFieldLabel(field);
        let html = '';
        if (includeLabels && label) {
            html += `<label for="${fieldId}">${this.escapeHtml(label)}</label>\n`;
        }
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

class BootstrapRenderer extends BaseRenderer {
    renderField(field, options = {}) {
        const { includeLabels = true } = options;
        const fieldId = this.getFieldId(field);
        const label = this.getFieldLabel(field);
        let html = '';
        html += '<div class="mb-3">\n';
        if (includeLabels && label) {
            const requiredMark = field.properties?.required ? ' <span class="text-danger">*</span>' : '';
            html += `  <label for="${fieldId}" class="form-label">${this.escapeHtml(label)}${requiredMark}</label>\n`;
        }
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
        if (!field.properties?.required) {
            html += `    <option value="">Choose...</option>\n`;
        }
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

class TailwindRenderer extends BaseRenderer {
    renderField(field, options = {}) {
        const { includeLabels = true, includeWrapper = true } = options;
        const attributes = this.formatAttributes(field.properties);
        const baseClasses = 'block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm';
        let html = '';
        if (includeWrapper) {
            html += '<div class="mb-4">\n';
        }
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
        if (field.meta.helperText) {
            html += `  <p class="mt-1 text-sm text-gray-500">${this.escapeHtml(field.meta.helperText)}</p>\n`;
        }
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

class RendererFactory {
    static createRenderer(framework = 'basic') {
        const rendererFactory = this.renderers.get(framework.toLowerCase());
        if (!rendererFactory) {
            throw new Error(`Renderer for framework '${framework}' not found. Available: ${Array.from(this.renderers.keys()).join(', ')}`);
        }
        return rendererFactory();
    }
    static getAvailableFrameworks() {
        return Array.from(this.renderers.keys());
    }
    static registerRenderer(framework, rendererFactory) {
        this.renderers.set(framework.toLowerCase(), rendererFactory);
    }
    static renderForm(rows, framework = 'basic', options = {}) {
        const renderer = this.createRenderer(framework);
        return renderer.renderForm(rows, { ...options, framework: framework });
    }
    static renderPreview(rows, framework = 'basic', options = {}) {
        const renderer = this.createRenderer(framework);
        return renderer.renderPreview(rows, { ...options, framework: framework });
    }
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
class HTMLGenerator {
    constructor(framework = 'basic') {
        this.framework = framework;
        this.renderer = RendererFactory.createRenderer(framework);
    }
    generateForm(rows, options = {}) {
        return this.renderer.renderForm(rows, { ...options, framework: this.framework });
    }
    generatePreview(rows, options = {}) {
        return this.renderer.renderPreview(rows, { ...options, framework: this.framework });
    }
    generateField(field, options = {}) {
        return this.renderer.renderField(field, { ...options, framework: this.framework });
    }
    generateRow(row, options = {}) {
        return this.renderer.renderRow(row, { ...options, framework: this.framework });
    }
    generateColumn(column, options = {}) {
        return this.renderer.renderColumn(column, { ...options, framework: this.framework });
    }
    setFramework(framework) {
        this.framework = framework;
        this.renderer = RendererFactory.createRenderer(framework);
    }
    getFramework() {
        return this.framework;
    }
    static getAvailableFrameworks() {
        return RendererFactory.getAvailableFrameworks();
    }
}

class ScopedDOMManager {
    constructor(container) {
        this.container = container;
        this.scopeId = this.generateScopeId();
        this.markContainerScope();
    }
    generateScopeId() {
        return `fb-scope-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }
    markContainerScope() {
        this.container.setAttribute('data-formbuilder-scope', this.scopeId);
        this.container.setAttribute('data-fb-version', '0.1.0');
        this.container.setAttribute('data-fb-initialized', new Date().toISOString());
    }
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
            return document.querySelectorAll('');
        }
    }
    getElementById(id) {
        return this.container.querySelector(`#${CSS.escape(id)}`);
    }
    addEventListener(event, handler, options) {
        this.container.addEventListener(event, handler, options);
    }
    removeEventListener(event, handler) {
        this.container.removeEventListener(event, handler);
    }
    createElement(tagName, attributes) {
        const element = document.createElement(tagName);
        element.setAttribute('data-fb-scope', this.scopeId);
        element.setAttribute('data-fb-created', 'true');
        if (attributes) {
            Object.entries(attributes).forEach(([key, value]) => {
                element.setAttribute(key, value);
            });
        }
        return element;
    }
    createElementWithId(tagName, id, attributes) {
        const scopedId = this.getScopedId(id);
        const element = this.createElement(tagName, {
            id: scopedId,
            ...attributes
        });
        return element;
    }
    getScopedId(id) {
        return `${this.scopeId}-${id}`;
    }
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
            if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
                console.trace('Stack trace for security violation');
            }
            return false;
        }
        return true;
    }
    isPropertyPanelElement(element) {
        let current = element;
        while (current) {
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
    getContainer() {
        return this.container;
    }
    getScopeId() {
        return this.scopeId;
    }
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
    cleanup() {
        const scopedElements = this.container.querySelectorAll(`[data-fb-scope="${this.scopeId}"]`);
        scopedElements.forEach(element => {
            if (element.parentNode) {
                element.parentNode.removeChild(element);
            }
        });
        this.container.removeAttribute('data-formbuilder-scope');
        this.container.removeAttribute('data-fb-version');
        this.container.removeAttribute('data-fb-initialized');
    }
}

class AstraFormBuilder extends EventEmitter {
    constructor(containerSelector, options) {
        super();
        this.rows = [];
        this.formElement = null;
        this.selectedElement = null;
        this.debugMode = false;
        this.canvasClickHandler = null;
        this.addColumnDebounce = {};
        this.isLoaded = false;
        this.elementCounters = {};
        this.container = this.resolveContainer(containerSelector);
        this.scopedDOM = new ScopedDOMManager(this.container);
        if (options?.debug !== undefined) {
            this.debugMode = options.debug;
        }
        this.elementRegistry = new ElementRegistry();
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
        this.createFormBuilderStructure();
        this.canvas = this.scopedDOM.getElementById(this.scopedDOM.getScopedId('formCanvas'));
        this.toolbox = this.scopedDOM.querySelector('.toolbox');
        this.propertiesPanel = this.scopedDOM.getElementById(this.scopedDOM.getScopedId('propertiesPanel'));
        const propertiesContainer = this.scopedDOM.getElementById(this.scopedDOM.getScopedId('propertiesContent'));
        this.propertyPanelInstance = new PropertyPanel(propertiesContainer);
        this.dragDropManager = new DragDropManager(this.container, this.scopedDOM);
        this.init();
        if (options?.form) {
            this.loadInitialForm(options.form);
        }
    }
    loadInitialForm(formData) {
        try {
            let dataToImport;
            if (!Array.isArray(formData) && 'version' in formData) {
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
    resolveContainer(containerSelector) {
        if (containerSelector instanceof HTMLElement) {
            return containerSelector;
        }
        if (typeof containerSelector === 'string') {
            let element = null;
            if (containerSelector.startsWith('#')) {
                const id = containerSelector.substring(1);
                element = document.getElementById(id);
                if (!element) {
                    throw new Error(`FormBuilder Error: Element with ID "${id}" not found. Make sure the element exists in the DOM before initializing FormBuilder.`);
                }
            }
            else if (containerSelector.startsWith('.')) {
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
        throw new Error(`FormBuilder Error: Invalid container parameter. Expected string selector or HTMLElement, received ${typeof containerSelector}.`);
    }
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
        this.setupEventListeners();
        this.populateToolbox();
        this.setupDragAndDrop();
        this.setupDebugToggle();
        this.render();
        this.isLoaded = true;
        this.dispatchFormBuilderLoadedEvent();
    }
    toSlug(text) {
        return text
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
    }
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
    generateUniqueId(elementType) {
        if (!(elementType in this.elementCounters)) {
            this.elementCounters[elementType] = 0;
        }
        this.elementCounters[elementType] = (this.elementCounters[elementType] || 0) + 1;
        const baseSlug = this.toSlug(elementType);
        return `${baseSlug}-${this.elementCounters[elementType]}`;
    }
    resetElementCounters() {
        this.elementCounters = {};
    }
    updateCountersFromExistingData() {
        this.resetElementCounters();
        if (this.formElement) {
            this.updateCounterFromId('form', this.formElement.id);
        }
        this.rows.forEach(row => {
            this.updateCounterFromId('row', row.id);
            row.columns.forEach(column => {
                this.updateCounterFromId('column', column.id);
                column.fields.forEach(field => {
                    this.updateCounterFromId(field.htmlTag, field.id);
                });
            });
        });
    }
    updateCounterFromId(elementType, id) {
        const baseSlug = this.toSlug(elementType);
        const regex = new RegExp(`^${baseSlug}-(\\d+)$`);
        const match = id.match(regex);
        if (match && match[1]) {
            const number = parseInt(match[1], 10);
            if (!isNaN(number)) {
                this.elementCounters[elementType] = Math.max(this.elementCounters[elementType] || 0, number);
            }
        }
    }
    isFormElement(elementType) {
        const config = this.elementRegistry.get(elementType);
        return config ? ElementTypeUtils.isFormControl(config.htmlTag) : false;
    }
    findElement(selector) {
        return this.scopedDOM.querySelector(selector);
    }
    findElements(selector) {
        return this.scopedDOM.querySelectorAll(selector);
    }
    findById(id) {
        return this.scopedDOM.getElementById(id);
    }
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
    validateElementOperation(element, operation) {
        return this.scopedDOM.validateOperation(element, operation);
    }
    createScopedElement(tagName, attributes) {
        return this.scopedDOM.createElement(tagName, attributes);
    }
    createScopedElementWithId(tagName, id, attributes) {
        return this.scopedDOM.createElementWithId(tagName, id, attributes);
    }
    setupEventListeners() {
        this.propertyPanelInstance.on('propertyChanged', this.handlePropertyChange.bind(this));
        this.propertyPanelInstance.on('deleteElement', this.handleDeleteElement.bind(this));
        this.setupScopedEventListeners();
    }
    setupScopedEventListeners() {
        this.scopedDOM.addEventListener('click', ((e) => this.handleScopedClick(e)));
        this.scopedDOM.addEventListener('dragstart', ((e) => this.handleScopedDragStart(e)));
        this.scopedDOM.addEventListener('dragover', ((e) => this.handleScopedDragOver(e)));
        this.scopedDOM.addEventListener('drop', ((e) => this.handleScopedDrop(e)));
        this.scopedDOM.addEventListener('dragenter', ((e) => this.handleScopedDragEnter(e)));
        this.scopedDOM.addEventListener('dragleave', ((e) => this.handleScopedDragLeave(e)));
    }
    handleScopedClick(e) {
        const target = e.target;
        if (!this.validateElementOperation(target, 'click')) {
            return;
        }
        const elementItem = target.closest('.element-item');
        if (elementItem && elementItem.dataset.elementType) {
            e.preventDefault();
            const elementType = elementItem.dataset.elementType;
            if (this.debugMode) {
                console.log('🖱️ Click-to-add element:', elementType);
            }
            this.addElementByClick(elementType);
            return;
        }
        if (this.canvasClickHandler) {
            this.canvasClickHandler(e);
        }
    }
    handleScopedDragStart(e) {
        const target = e.target;
        if (!this.validateElementOperation(target, 'dragstart')) {
            e.preventDefault();
            return;
        }
    }
    handleScopedDragOver(e) {
        const target = e.target;
        if (!this.validateElementOperation(target, 'dragover')) {
            return;
        }
        e.preventDefault();
    }
    handleScopedDrop(e) {
        const target = e.target;
        if (!this.validateElementOperation(target, 'drop')) {
            return;
        }
    }
    handleScopedDragEnter(e) {
        const target = e.target;
        if (!this.validateElementOperation(target, 'dragenter')) {
            return;
        }
    }
    handleScopedDragLeave(e) {
        const target = e.target;
        if (!this.validateElementOperation(target, 'dragleave')) {
            return;
        }
    }
    setupDragAndDrop() {
        console.log('Setting up drag and drop with DragDropManager (scoped)...');
        this.dragDropManager.on('elementDropped', this.handleElementDropped.bind(this));
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
            if (elementType === 'form') {
                this.createFormElement();
                return;
            }
            if (elementType === 'row') {
                if (this.debugMode)
                    console.log('Adding row to canvas');
                this.createRow();
            }
            else if (elementType === 'column') {
                if (row) {
                    const rowId = row.dataset.rowId;
                    if (this.debugMode)
                        console.log('Adding column to row:', rowId);
                    if (rowId) {
                        this.addColumnToRowById(rowId);
                    }
                }
                else {
                    if (this.debugMode)
                        console.log('Creating new row with column on canvas');
                    this.createRow();
                }
            }
            else {
                if (column) {
                    const columnId = column.dataset.elementId;
                    if (this.debugMode)
                        console.log('Adding element to column:', elementType, columnId);
                    this.createElementInColumn(elementType, columnId);
                }
                else if (row) {
                    const rowId = row.dataset.rowId;
                    if (this.debugMode)
                        console.log('Adding element to row:', elementType, rowId);
                    this.createElementInRow(elementType, rowId);
                }
                else {
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
        const fieldId = Utils.generateId();
        const fieldConfig = this.elementRegistry.get(elementType);
        if (fieldConfig) {
            const properties = {};
            if (fieldConfig.properties) {
                for (const [key, propDef] of Object.entries(fieldConfig.properties)) {
                    properties[key] = propDef.defaultValue || '';
                }
            }
            const autoIncrementId = this.generateUniqueId(elementType);
            properties.id = autoIncrementId;
            if (fieldConfig.properties?.name) {
                properties.name = autoIncrementId;
            }
            const meta = {};
            if (fieldConfig.meta) {
                for (const [key, propDef] of Object.entries(fieldConfig.meta)) {
                    meta[key] = propDef.defaultValue || '';
                }
            }
            if (this.isFormElement(elementType) && fieldConfig.meta?.label) {
                meta.label = autoIncrementId;
            }
            const field = {
                id: fieldId,
                elementRegistryId: elementType,
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
        const targetRow = this.rows.find(r => r.id === rowId);
        if (!targetRow) {
            console.warn('Target row not found:', rowId);
            return;
        }
        if (targetRow.columns.length === 0) {
            const columnId = this.generateUniqueId('column');
            const newColumn = {
                id: columnId,
                width: 12,
                fields: [],
                properties: { id: columnId }
            };
            targetRow.columns.push(newColumn);
        }
        const firstColumn = targetRow.columns[0];
        if (firstColumn) {
            this.createElementInColumn(elementType, firstColumn.id);
        }
    }
    createElementInNewRow(elementType) {
        if (this.debugMode)
            console.log('Creating element in new row:', elementType);
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
        this.createElementInColumn(elementType, columnId);
        this.emitFormChange();
    }
    createFormElement() {
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
        const properties = {};
        if (formConfig.properties) {
            for (const [key, config] of Object.entries(formConfig.properties)) {
                properties[key] = config.defaultValue || '';
            }
        }
        const formId = this.generateUniqueId('form');
        properties.id = formId;
        if (formConfig.properties?.name) {
            properties.name = formId;
        }
        const events = {};
        if (formConfig.events) {
            for (const [key, config] of Object.entries(formConfig.events)) {
                events[key] = config.defaultValue || {};
            }
        }
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
            this.render();
        });
    }
    highlightElement(elementId) {
        this.scopedDOM.querySelectorAll('.selected').forEach(el => {
            el.classList.remove('selected');
        });
        const element = this.scopedDOM.querySelector(`[data-element-id="${elementId}"]`);
        if (element) {
            element.classList.add('selected');
        }
    }
    handlePropertyChange(data) {
        const { elementId, property, value, section = 'properties' } = data;
        const element = this.findElementById(elementId);
        if (!element) {
            console.warn('Element not found for property update:', elementId);
            return;
        }
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
        this.render();
        this.emitFormChange();
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
            this.handleSidebarDrop(event);
        }
        else {
            this.handleInternalDrop(event);
        }
    }
    findElementById(elementId) {
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
    addElementByClick(elementType) {
        try {
            if (!this.formElement) {
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
            let targetRow;
            let targetColumn;
            const rowId = this.generateUniqueId('row');
            const columnId = this.generateUniqueId('column');
            targetRow = {
                id: rowId,
                columns: [],
                properties: { id: rowId }
            };
            targetColumn = {
                id: columnId,
                width: 12,
                fields: [],
                properties: { id: columnId }
            };
            targetRow.columns.push(targetColumn);
            this.rows.push(targetRow);
            const autoIncrementId = this.generateUniqueId(elementType);
            const elementConfig = this.elementRegistry.get(elementType);
            if (!elementConfig) {
                console.error(`Element configuration not found for type: ${elementType}`);
                return;
            }
            const properties = {
                id: autoIncrementId,
                name: autoIncrementId
            };
            if (elementConfig.properties) {
                for (const [key, propDef] of Object.entries(elementConfig.properties)) {
                    properties[key] = propDef.defaultValue || '';
                }
            }
            const meta = {
                label: autoIncrementId
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
                events: {}
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
            this.render();
            this.emitFormChange();
            this.selectElement(newElement.id);
        }
        catch (error) {
            console.error('Error adding element by click:', error);
        }
    }
    addElement(elementType) {
        console.log('Adding element:', elementType);
    }
    deleteElement(elementId) {
        if (this.debugMode) {
            console.log('🗑️ Deleting element:', elementId);
        }
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
        for (let i = 0; i < this.rows.length; i++) {
            const row = this.rows[i];
            if (!row)
                continue;
            if (row.id === elementId) {
                this.rows.splice(i, 1);
                this.render();
                this.emitFormChange();
                return;
            }
            for (let j = 0; j < row.columns.length; j++) {
                const column = row.columns[j];
                if (!column)
                    continue;
                if (column.id === elementId) {
                    row.columns.splice(j, 1);
                    const newWidth = Math.floor(12 / Math.max(1, row.columns.length));
                    row.columns.forEach(col => col.width = newWidth);
                    this.render();
                    this.emitFormChange();
                    return;
                }
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
            this.rows = data;
            this.formElement = null;
        }
        else {
            this.formElement = data.formElement || null;
            this.rows = data.rows || [];
        }
        this.updateCountersFromExistingData();
        this.render();
        this.emitFormChange();
    }
    exportJsonFile(filename) {
        try {
            const metadata = {
                title: 'Form Builder Layout',
                description: 'Form layout created with Form Builder',
                version: '0.1.0',
                createdAt: new Date().toISOString()
            };
            const exportData = {
                formElement: this.formElement,
                rows: this.rows,
                metadata
            };
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
    fromJSON(jsonData) {
        try {
            if (!jsonData) {
                throw new Error('JSON data is required');
            }
            let rows;
            let formElement = null;
            if (Array.isArray(jsonData)) {
                rows = jsonData;
                formElement = null;
            }
            else if (jsonData.rows && Array.isArray(jsonData.rows)) {
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
            if (!Array.isArray(rows)) {
                throw new Error('Invalid data: rows must be an array');
            }
            this.formElement = formElement;
            this.rows = rows;
            this.updateCountersFromExistingData();
            this.selectedElement = null;
            this.showNoSelectionPanel();
            this.render();
            this.emit('form:changed', this.rows);
            if (this.debugMode) {
                console.log('✅ Form loaded from JSON:', {
                    rows: this.rows.length,
                    elements: this.getTotalElementCount(),
                    preview: JSONExporter.createPreview(this.rows)
                });
            }
            this.dispatchFormImportedEvent(jsonData);
        }
        catch (error) {
            console.error('❌ Error loading form from JSON:', error);
            const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
            alert(`Failed to load form: ${errorMessage}`);
            throw error;
        }
    }
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
    getTotalElementCount() {
        let count = 0;
        for (const row of this.rows) {
            for (const column of row.columns) {
                count += column.fields.length;
            }
        }
        return count;
    }
    isFormBuilderLoaded() {
        return this.isLoaded;
    }
    getFormBuilderInstance() {
        return this;
    }
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
    async importFromJSON(file) {
        try {
            let fileToImport = file;
            if (!fileToImport) {
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
            this.formElement = null;
            this.resetElementCounters();
            this.propertyPanelInstance.hideProperties();
            this.render();
            this.emitFormChange();
            if (this.debugMode) {
                console.log('🗑️ Form cleared completely - no form element');
            }
        }
    }
    async generateHTML(framework = 'basic', options = {}) {
        const generator = new HTMLGenerator(framework);
        return generator.generateForm(this.rows, options);
    }
    async generatePreview(framework = 'basic', options = {}) {
        const generator = new HTMLGenerator(framework);
        return generator.generatePreview(this.rows, options);
    }
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
    setDebugMode(enabled) {
        this.debugMode = enabled;
        if (this.debugMode) {
            console.log('🐛 Debug mode enabled');
        }
        else {
            console.log('✅ Debug mode disabled');
        }
    }
    getFormData() {
        return JSON.parse(JSON.stringify(this.rows));
    }
    setFormData(rows) {
        this.rows = rows;
        this.render();
        this.propertyPanelInstance.hideProperties();
        this.emitFormChange();
    }
    onFormChange(callback) {
        this.on('form-changed', callback);
    }
    offFormChange(callback) {
        this.off('form-changed', callback);
    }
    emitFormChange() {
        this.emit('form-changed', this.getFormData());
    }
    render() {
        const dropZone = this.scopedDOM.getElementById(this.scopedDOM.getScopedId('dropZone'));
        if (!dropZone)
            return;
        let contentHtml = '';
        if (this.formElement) {
            contentHtml += this.renderFormElementHtml();
        }
        if (this.rows.length === 0 && !this.formElement) {
            dropZone.innerHTML = `
                <div class="drop-zone-placeholder">
                    <p>Drag elements to create rows and columns</p>
                </div>
            `;
            const createRowBtn = dropZone.querySelector('#createRowBtn');
            if (createRowBtn) {
                createRowBtn.addEventListener('click', () => {
                    console.log('Creating new row...');
                    this.createRow();
                });
            }
            this.dragDropManager.refresh();
            return;
        }
        if (this.rows.length > 0) {
            contentHtml += this.rows.map((row, index) => this.renderRowHtml(row, index)).join('');
        }
        if (this.formElement && this.rows.length === 0) {
            contentHtml += `
                <div class="drop-zone-placeholder" style="margin-top: 1rem;">
                    <p>Drag elements to add form fields</p>
                </div>
            `;
        }
        dropZone.innerHTML = contentHtml;
        this.attachRowEventListeners();
        this.dragDropManager.refresh();
    }
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
        console.log('🎨 =================================');
        console.log('🎨 generateFieldPreview CHAMADO!');
        console.log('🎨 Field ID:', field.id);
        console.log('🎨 Field Type:', field.htmlTag);
        console.log('🎨 Config encontrada:', !!config);
        console.log('🎨 PreviewRenderer existe:', !!this.previewRenderer);
        console.log('🎨 =================================');
        return this.previewRenderer.renderField(field, {
            includeLabels: true,
            includeWrapper: false
        });
    }
    populateToolbox() {
        const elementsList = this.findById(this.scopedDOM.getScopedId('elementsList'));
        if (!elementsList)
            return;
        const elements = this.elementRegistry.getAll();
        const categories = elements.reduce((acc, config) => {
            const category = config.category || 'other';
            if (!acc[category]) {
                acc[category] = [];
            }
            acc[category].push(config);
            return acc;
        }, {});
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
                        toggleIcon.classList.remove('expanded');
                        elementsList.classList.remove('expanded');
                    }
                    else {
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
                    width: 12,
                    fields: [],
                    properties: { id: columnId }
                }],
            properties: { id: rowId }
        };
        this.rows.push(newRow);
        this.render();
        console.log('Row created, total rows:', this.rows.length);
    }
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
        const row = this.rows[0];
        if (!row)
            return;
        const columnId = this.generateUniqueId('column');
        const newColumn = {
            id: columnId,
            width: Math.floor(12 / (row.columns.length + 1)),
            fields: [],
            properties: { id: columnId }
        };
        const newWidth = Math.floor(12 / (row.columns.length + 1));
        row.columns.forEach(col => col.width = newWidth);
        row.columns.push(newColumn);
        this.render();
    }
    createField(elementType) {
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
        const properties = {};
        if (config.properties) {
            for (const [key, propDef] of Object.entries(config.properties)) {
                properties[key] = propDef.defaultValue || '';
            }
        }
        const meta = {};
        if (config.meta) {
            for (const [key, propDef] of Object.entries(config.meta)) {
                meta[key] = propDef.defaultValue || '';
            }
        }
        if (elementType === 'h1') {
            console.log('Creating H1 field with meta:', {
                configMeta: config.meta,
                extractedMeta: meta,
                metaKeys: Object.keys(meta)
            });
        }
        const events = {};
        if (config.events) {
            for (const [key, propDef] of Object.entries(config.events)) {
                events[key] = propDef.defaultValue || { action: '', target: 'vanilla', parameters: {} };
            }
        }
        const alpine = {};
        if (config.alpine) {
            for (const [key, propDef] of Object.entries(config.alpine)) {
                alpine[key] = propDef.defaultValue || '';
            }
        }
        const fieldId = Utils.generateId();
        const autoIncrementId = this.generateUniqueId(elementType);
        if (this.isFormElement(elementType) && config.meta?.label) {
            meta.label = autoIncrementId;
        }
        const newField = {
            id: fieldId,
            elementRegistryId: elementType,
            htmlTag: config.htmlTag,
            properties: {
                ...properties,
                id: autoIncrementId,
                name: config.properties?.name ? autoIncrementId : undefined
            },
            meta: meta,
            events: events,
            alpine: alpine
        };
        column.fields.push(newField);
        this.render();
    }
    moveElement(elementId, position) {
        console.log('Moving element:', elementId, position);
    }
    renderRow(element) {
        this.render();
    }
    attachRowEventListeners() {
        console.log('Attaching row event listeners...');
        if (this.canvasClickHandler) {
            this.scopedDOM.removeEventListener('click', this.canvasClickHandler);
        }
        this.canvasClickHandler = (e) => {
            const target = e.target;
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
                    const element = target.closest('[data-element-id]');
                    if (element) {
                        const elementType = element.dataset.elementType;
                        if (element.classList.contains('form-column') ||
                            element.classList.contains('column-placeholder') ||
                            element.classList.contains('form-column-placeholder')) {
                            return;
                        }
                        if (elementType === 'field') {
                            e.preventDefault();
                            this.selectElement(element.dataset.elementId);
                        }
                        else if (elementType === 'form') {
                            e.preventDefault();
                            this.selectElement(element.dataset.elementId);
                        }
                        else if (elementType === 'row' || elementType === 'column') {
                            this.selectElement(element.dataset.elementId);
                        }
                    }
                }
            }
        };
        this.scopedDOM.addEventListener('click', this.canvasClickHandler);
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
    addColumnToRowById(rowId) {
        console.log('addColumnToRowById called with rowId:', rowId);
        const row = this.rows.find(r => r.id === rowId);
        if (!row) {
            console.warn('Row not found:', rowId);
            console.log('Available rows:', this.rows.map(r => r.id));
            return;
        }
        console.log('Row found:', row);
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
        const columnId = this.generateUniqueId('column');
        const newColumn = {
            id: columnId,
            width: baseWidth + (currentColumnCount < remainder ? 1 : 0),
            fields: [],
            properties: { id: columnId }
        };
        console.log('New column created:', newColumn);
        row.columns.forEach((col, index) => {
            col.width = baseWidth + (index < remainder ? 1 : 0);
        });
        row.columns.push(newColumn);
        console.log(`Column added successfully. Row ${rowId} now has ${row.columns.length} columns`);
        this.render();
        console.log('Re-render completed');
    }
    selectElement(elementId) {
        if (this.formElement && this.formElement.id === elementId) {
            this.selectedElement = this.formElement;
            const config = this.elementRegistry.get('form');
            if (config) {
                this.propertyPanelInstance.showProperties(this.formElement, config, 'form');
            }
            return;
        }
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
            this.addColumnToRow();
        }
        else {
            this.createField(elementType);
        }
    }
    moveRow(rowId, target, event) {
        if (this.debugMode)
            console.log('Moving row:', rowId);
        const rowIndex = this.rows.findIndex(r => r.id === rowId);
        if (rowIndex === -1) {
            console.warn('Row not found for moving:', rowId);
            return;
        }
        const rowToMove = this.rows[rowIndex];
        if (!rowToMove)
            return;
        const canvas = target.closest('.form-canvas');
        const targetRow = target.closest('.form-row');
        if (canvas && !targetRow) {
            const canvasRect = canvas.getBoundingClientRect();
            const mouseY = event?.clientY || 0;
            const canvasHeight = canvasRect.height;
            const relativeY = mouseY - canvasRect.top;
            this.rows.splice(rowIndex, 1);
            let insertIndex = 0;
            if (relativeY > canvasHeight * 0.8) {
                insertIndex = this.rows.length;
            }
            else if (relativeY < canvasHeight * 0.2) {
                insertIndex = 0;
            }
            else {
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
                this.rows.splice(rowIndex, 1);
                const adjustedIndex = rowIndex < targetIndex ? targetIndex - 1 : targetIndex;
                let insertIndex = adjustedIndex;
                if (event) {
                    const rect = targetRow.getBoundingClientRect();
                    const mouseY = event.clientY;
                    const rowHeight = rect.height;
                    const relativeY = mouseY - rect.top;
                    if (relativeY < rowHeight * 0.3) {
                        insertIndex = adjustedIndex;
                    }
                    else if (relativeY > rowHeight * 0.7) {
                        insertIndex = adjustedIndex + 1;
                    }
                    else {
                        insertIndex = adjustedIndex;
                    }
                }
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
            const targetColumnId = targetColumn.dataset.elementId;
            for (const row of this.rows) {
                const targetColIndex = row.columns.findIndex(c => c.id === targetColumnId);
                if (targetColIndex !== -1) {
                    sourceRow.columns.splice(sourceColumnIndex, 1);
                    const rect = targetColumn.getBoundingClientRect();
                    const mouseX = event instanceof DragEvent ? event.clientX : 0;
                    const insertAfter = mouseX > rect.left + rect.width / 2;
                    const insertIndex = insertAfter ? targetColIndex + 1 : targetColIndex;
                    row.columns.splice(insertIndex, 0, columnToMove);
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
            const targetRowId = targetRow.dataset.rowId;
            const targetRowObj = this.rows.find(r => r.id === targetRowId);
            if (targetRowObj && targetRowObj !== sourceRow) {
                sourceRow.columns.splice(sourceColumnIndex, 1);
                targetRowObj.columns.push(columnToMove);
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
            for (const row of this.rows) {
                for (const column of row.columns) {
                    if (column.id === targetColumnId) {
                        sourceColumn.fields.splice(sourceFieldIndex, 1);
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
    isElementInScope(element) {
        return this.scopedDOM.isInScope(element);
    }
    getContainer() {
        return this.scopedDOM.getContainer();
    }
    getScopeId() {
        return this.scopedDOM.getScopeId();
    }
    destroy() {
        this.scopedDOM.cleanup();
        this.rows = [];
        this.selectedElement = null;
        this.isLoaded = false;
        this.container.removeAttribute('data-formbuilder-scope');
        this.container.removeAttribute('data-fb-version');
        this.container.removeAttribute('data-fb-initialized');
        console.log('🧹 FormBuilder destroyed and cleaned up');
    }
}

const VERSION = '0.1.0';
const LIBRARY_INFO = {
    name: 'AstraSmartForm',
    version: VERSION,
    description: 'Professional drag-and-drop form builder with TypeScript support by Astra Dev',
    author: 'Astra Dev',
    license: 'MIT',
    repository: 'https://github.com/astradevio/astra-smartform',
    documentation: 'https://docs.astradev.io/smartform'
};

export { AstraFormBuilder, BaseRenderer, BasicRenderer, BootstrapRenderer, DragDropManager, ElementRegistry, AstraFormBuilder as FormBuilder, JSONExporter, LIBRARY_INFO, PreviewRenderer, PropertyPanel, RendererFactory, ScopedDOMManager, TailwindRenderer, Utils, VERSION };
//# sourceMappingURL=astra-form-builder.esm.js.map
