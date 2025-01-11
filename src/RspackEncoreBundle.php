<?php

declare(strict_types=1);

namespace Damian972\RspackEncoreBundle;

use Damian972\RspackEncoreBundle\DependencyInjection\EntrypointLookupPass;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\HttpKernel\Bundle\Bundle;

final class RspackEncoreBundle extends Bundle
{
    public function build(ContainerBuilder $container): void
    {
        parent::build($container);

        $container->addCompilerPass(new EntrypointLookupPass());
    }
}
