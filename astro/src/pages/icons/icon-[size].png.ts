import type { APIRoute } from 'astro';
import { iconResponse, iconSizes } from '../../lib/icons';

export const getStaticPaths = () =>
  iconSizes.map((size) => ({
    params: { size: `${size}x${size}` },
    props: { size },
  }));

export const GET: APIRoute<{ size: number }> = ({ props }) =>
  iconResponse(props.size);
