import config from '__data/config.json';

export function SEOConfig(
  title: string,
  subtitle?: string,
  description?: string
) {
  const titleString = `${title || (config?.projectName ?? '')}`;
  const hasSubtitle = !!subtitle || !!config?.subtitle;
  const subtitleString = hasSubtitle
    ? `| ${subtitle || (config?.subtitle ?? '')}`
    : '';

  return {
    title: `${titleString} ${subtitleString}`,
    description: description || config?.description,
    twitter: {
      cardType: 'summary_large_image',
      handle: config.twitterHandle,
    },
    openGraph: {
      url: config?.url,
      title: `${title || config?.projectName} | DJ Chad`,
      description: description || config?.description,
      locale: config?.locale,
      images: config?.images,
    },
    additionalLinkTags: config.additionalLinkTags,
  };
}
