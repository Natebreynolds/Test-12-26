import { ImageLoaderProps } from 'next/image';

export function optimizedImageLoader({ src, width, quality = 75 }: ImageLoaderProps) {
  return `${src}?w=${width}&q=${quality}&auto=format`;
}