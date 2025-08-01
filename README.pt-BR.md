# AstraFormBuilder – Pacote de Distribuição GitHub

🚀 Versão **pronta para uso**, compilada e **minificada** do **Astra Form Builder v0.1.4**, um construtor de formulários moderno e extensível com suporte a arrastar-e-soltar, desenvolvido pela **Astra Dev** em TypeScript puro.

⚠️ **PACOTE PRIVADO** – Atualmente em desenvolvimento ativo e distribuído via GitHub Package Registry.

---

## 📦 Instalação (Registro de Pacotes do GitHub)

### Pré-requisitos

```bash
# Configure o NPM para usar o GitHub Package Registry para os pacotes @astradevio
npm login --scope=@astradevio --registry=https://npm.pkg.github.com
```

### Autenticação

1. Generate a Personal Access Token with `read:packages` scope
2. Login to GitHub Package Registry:
```bash
npm login --scope=@astradevio --registry=https://npm.pkg.github.com
```

3. Configure .npmrc for scoped packages:
```bash
echo "@astradevio:registry=https://npm.pkg.github.com" >> .npmrc
```

### Instalar o Pacote

```bash
# Instalar do GitHub Package Registry
npm install @astradevio/astra-form-builder

# Ou instale diretamente do repositório
npm install git+https://github.com/astradevio/astra-form-builder-dist.git
```

---

## 🚀 Início Rápido

### Integração com HTML

```html
<div id="form-builder"></div>
<script src="node_modules/@astradevio/astra-form-builder/astra-form-builder.bundle.min.js"></script>
<script>
    const formBuilder = new FormBuilder(document.getElementById('form-builder'));
</script>
```

### Uso com TypeScript

```ts
import { FormBuilder } from '@astradevio/astra-form-builder';

const container = document.getElementById('form-builder');
const formBuilder = new FormBuilder(container);
```

---

## 📁 Conteúdo do Pacote

- `astra-form-builder.bundle.min.js` – Bundle JavaScript minificado (tudo em um)
- `main.d.ts` – Definições de TypeScript
- `styles.min.css` – Estilos principais minificados
- `basic.min.css` – Tema básico
- `preview.min.css` – Estilos de visualização
- `tailwind.min.css` – Tema Tailwind
- `package.json` – Metadados do NPM
- `README.md` – Esta documentação ✅

---

## 🌟 Funcionalidades

- 🧩 **Arrastar e Soltar** – Adicione campos intuitivamente na tela
- ⚡ **Clique para Adicionar** – Criação rápida com apenas um clique
- 🧠 **Elementos Extensíveis** – Adicione componentes personalizados com plugins
- 🧰 **Toolbox Configurável** – Exiba/oculte ou reordene elementos
- 💾 **Opções de Exportação** – JSON e HTML (Basic, Bootstrap, Tailwind)
- 📐 **Design Responsivo** – Otimizado para uso em desktop
- 🧪 **API Completa em TypeScript** – Integração confiável e manutenção facilitada

---

## 🧩 Elementos de Formulário Suportados

- Todos os principais elementos HTML são suportados.

- **Texto** – Campo de linha única
- **Email** – Com validação
- **Área de Texto** – Campo de várias linhas
- **Número** – Com mínimo/máximo
- **Select** – Dropdown configurável
- **Checkbox** – Seletor booleano

Melhorias em alguns componentes de formulário estão a caminho...

---

## 🐛 Problemas Conhecidos

- Mobile: Interface otimizada para desktop – ainda sem suporte completo a toque
- Desempenho: Muitos componentes podem afetar a performance
- Navegadores: Testado no Chrome e Firefox (últimas versões)

---

## 📋 Notas sobre o Pacote GitHub

### Autenticação

1. Crie um **Token Pessoal do GitHub** com escopo `read:packages`
2. Faça login no Registry do GitHub:

```bash
npm login --scope=@astradevio --registry=https://npm.pkg.github.com
```

---

## 🔗 Links

- 🏠 **Repositório Principal**: [https://github.com/astradevio/astra-form-builder](https://github.com/astradevio/astra-form-builder)
- 📦 **Distribuição GitHub**: [https://github.com/astradevio/astra-form-builder-dist](https://github.com/astradevio/astra-form-builder-dist)
- 🌍 **NPM Registry (Public)**: [npmjs.com/package/@astradevio/astra-form-builder](https://www.npmjs.com/package/@astradevio/astra-form-builder)
- 📦 **Direct Git**: `npm install git+https://github.com/astradevio/astra-form-builder-dist-github.git`
- ❗ **Issues**: [Rastreamento de Bugs](https://github.com/astradevio/astra-form-builder/issues)
- 🧪 **Pacote GitHub**: [`@astradevio/astra-form-builder`](https://github.com/astradevio/astra-form-builder/packages)

### 🌍 Distribuições Disponíveis

Este pacote está disponível em múltiplas plataformas:

- **NPM Registry (Public)**: `npm install @astradevio/astra-form-builder` - No authentication required
- **GitHub Package Registry (Private)**: Requires GitHub authentication and token
- **Direct Git**: `npm install git+https://github.com/astradevio/astra-form-builder-dist-github.git`

---

## 📞 Suporte

- Abra uma issue no GitHub
- Consulte a documentação inline
- Use `FormBuilderDebug.exportConsole()` no console do navegador para depurar

---

## 📄 Licença

Licença MIT – veja o arquivo [LICENSE](./LICENSE.md) para mais detalhes.

---

## 🏢 Sobre a Astra Dev

**AstraFormBuilder** é um projeto da **Astra Dev**, uma empresa especializada em aplicações web inteligentes, modulares e de alta performance.

- 🌐 Website: [https://www.astradev.io](https://www.astradev.io)
- 📧 Contato: developer@astradev.io

---

**Versão**: 0.1.4 – MVP  
**Plataforma**: GitHub  
**Status**: 🔒 Distribuição Privada  
**Última atualização**: 2025-08-01

> 📝 *Este README também está disponível em [English](README.md)*

---

**AstraFormBuilder** – Construindo formulários inteligentes para o futuro 🚀
