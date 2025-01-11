# RspackEncoreBundle

Overrides default Webpack Encore bundle config for my Rspack 🦀️ usage

## Installation

**1**. Add this config below in your `composer.json` to [load from the repository](https://getcomposer.org/doc/05-repositories.md#loading-a-package-from-a-vcs-repository).

```json
{
    "repositories": [
        {
            "type": "vcs",
            "url": "https://github.com/Damian972/rspack-encore-bundle"
        }
    ],
    "require": {
        "damian972/rspack-encore-bundle": "dev-main"
    }
}
```

then run:

```shell
composer update
```

**2**. Register the bundle in `config/bundles.php`, if you're using Symfony Flex (default since SF 4) then ignore this step.

```php
$bundles = [
    ...
    Damian972\RspackEncoreBundle\RspackEncoreBundle::class => ['all' => true],
];
```

**3**. Install and configure the `node_modules` dependancies in your `package.json`.

**4**. Enjoy.

**_Note_**: For the step 3, you can check my default config in the example folder (Scss / Tailwindcss).
