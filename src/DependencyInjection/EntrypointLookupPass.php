<?php

declare(strict_types=1);

namespace Damian972\RspackEncoreBundle\DependencyInjection;

use Damian972\RspackEncoreBundle\Asset\EntrypointLookup;
use Damian972\RspackEncoreBundle\CacheWarmer\EntrypointCacheWarmer;
use Symfony\Component\DependencyInjection\Compiler\CompilerPassInterface;
use Symfony\Component\DependencyInjection\ContainerBuilder;

/**
 * @see https://github.com/symfony/webpack-encore-bundle/blob/3b5ed468e5235f7a508b46033653a7bccd740913/src/DependencyInjection/WebpackEncoreExtension.php#L75
 */
final class EntrypointLookupPass implements CompilerPassInterface
{
    public function process(ContainerBuilder $container): void
    {
        // Override the default webpack encore entrypoint lookup service to use our own implementation
        $container->getDefinition('webpack_encore.entrypoint_lookup[_default]')
            ->setClass(EntrypointLookup::class)
        ;

        $container->getDefinition('webpack_encore.entrypoint_lookup.cache_warmer')
            ->setClass(EntrypointCacheWarmer::class)
        ;
    }
}
