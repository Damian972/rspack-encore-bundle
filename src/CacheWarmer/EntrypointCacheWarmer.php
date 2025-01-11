<?php

declare(strict_types=1);

namespace Damian972\RspackEncoreBundle\CacheWarmer;

use Damian972\RspackEncoreBundle\Asset\EntrypointLookup;
use Symfony\Bundle\FrameworkBundle\CacheWarmer\AbstractPhpFileCacheWarmer;
use Symfony\Component\Cache\Adapter\ArrayAdapter;
use Symfony\Contracts\HttpClient\HttpClientInterface;
use Symfony\WebpackEncoreBundle\Exception\EntrypointNotFoundException;

class EntrypointCacheWarmer extends AbstractPhpFileCacheWarmer
{
    public function __construct(
        private readonly array $cacheKeys,
        private readonly ?HttpClientInterface $httpClient,
        string $phpArrayFile
    ) {
        parent::__construct($phpArrayFile);
    }

    protected function doWarmUp(string $cacheDir, ArrayAdapter $arrayAdapter, ?string $buildDir = null): bool
    {
        foreach ($this->cacheKeys as $cacheKey => $path) {
            // If the file does not exist then just skip past this entry point.
            if (!file_exists($path)) {
                continue;
            }

            $entryPointLookup = new EntrypointLookup($path, $arrayAdapter, $cacheKey, httpClient: $this->httpClient);

            try {
                $entryPointLookup->getJavaScriptFiles('dummy');
            } catch (EntrypointNotFoundException $e) {
                // ignore exception
            }
        }

        return true;
    }
}
