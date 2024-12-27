const API_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL;
const DIRECTUS_TOKEN = process.env.NEXT_PUBLIC_DIRECTUS_TOKEN;

if (!API_URL) {
  throw new Error('NEXT_PUBLIC_DIRECTUS_URL environment variable is not set');
}

if (!DIRECTUS_TOKEN) {
  throw new Error('NEXT_PUBLIC_DIRECTUS_TOKEN environment variable is not set');
}

export const getAssetURL = (assetId: string | null | undefined): string => {
  if (!assetId) return '/produse/default.webp';
  return `${API_URL}/assets/${assetId}?access_token=${DIRECTUS_TOKEN}`;
};

export const fetchAPI = async (
  endpoint: string, 
  options: {
    filters?: Record<string, string>;
    fields?: string[];
    sort?: string[];
    limit?: number;
    offset?: number;
  } = {}
) => {
  const {
    filters = {},
    fields = ['*'],
    sort = [], // Removed default sort
    limit = 100,
    offset = 0
  } = options;

  const params = new URLSearchParams();
  params.append('access_token', DIRECTUS_TOKEN);
  
  if (fields.length > 0) params.append('fields', fields.join(','));
  if (sort.length > 0) sort.forEach(sortOption => params.append('sort[]', sortOption));
  if (limit) params.append('limit', limit.toString());
  if (offset) params.append('offset', offset.toString());

  Object.entries(filters).forEach(([key, value]) => {
    params.append(`filter[${key}][_eq]`, value);
  });

  const url = `${API_URL}/${endpoint.replace(/^\//, '')}?${params.toString()}`;
  
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      },
      next: { 
        revalidate: 0 
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Response body:', errorText);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};

export const getHomePageContent = async () => {
  try {
    const response = await fetchAPI('items/scris_pagina_home', {
      fields: [
        'despre_noi',
        'procesul_nostru',
        'comenzi_speciale',
        'comenzi_speciale_2'
      ],
      limit: 1
    });

    if (!response.data) {
      console.error('No data in response:', response);
      return null;
    }

    return Array.isArray(response.data) ? response.data[0] : response.data;
  } catch (error) {
    console.error('Error fetching home page content:', error);
    return null;
  }
};

export const getTestimonials = async () => {
  try {
    const response = await fetchAPI('items/testimoniale', {
      fields: [
        'id',
        'poza',
        'firma_sau_persoana',
        'detinator_firma',
        'testimonial'
      ]
    });

    if (!response.data) {
      console.error('No testimonials data in response:', response);
      return [];
    }

    return Array.isArray(response.data) ? response.data : [response.data];
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return [];
  }
};

interface GalleryFile {
  id: number;
  galerie_id: number | null;
  directus_files_id: string;
}

export const getGalleryImages = async () => {
  try {
    const response = await fetchAPI('items/galerie_files', {
      fields: [
        'id',
        'galerie_id',
        'directus_files_id'
      ]
    });

    if (!response.data) {
      console.error('No gallery data in response:', response);
      return [];
    }

    // Filter out items with null or invalid IDs
    const validImages = Array.isArray(response.data) 
      ? response.data.filter((item: GalleryFile) => 
          item.directus_files_id !== null && 
          item.directus_files_id !== undefined &&
          item.galerie_id !== null &&
          item.galerie_id !== undefined
        )
      : [];

    // Additional check - verify each file exists
    const verifiedImages = await Promise.all(
      validImages.map(async (image: GalleryFile) => {
        try {
          const fileCheckResponse = await fetch(
            `${API_URL}/assets/${image.directus_files_id}?access_token=${DIRECTUS_TOKEN}`,
            { method: 'HEAD' }
          );
          return fileCheckResponse.ok ? image : null;
        } catch (error) {
          console.error(`Failed to verify file ${image.directus_files_id}:`, error);
          return null;
        }
      })
    );

    // Remove any null entries (failed verifications)
    return verifiedImages.filter((image): image is GalleryFile => image !== null);

  } catch (error) {
    console.error('Error fetching gallery images:', error);
    return [];
  }
};

interface HomePageProduct {
  id: number;
  imagine_produs: string;
  imagine_logo: string;
  imagine_sticla: string;
}

export const getHomePageProducts = async () => {
  try {
    const response = await fetchAPI('items/produse_prima_pagina', {
      fields: [
        'id',
        'imagine_produs',
        'imagine_logo',
        'imagine_sticla'
      ]
    });

    if (!response.data) {
      console.error('No products data in response:', response);
      return [];
    }

    const validProducts = Array.isArray(response.data) 
      ? response.data.filter((product: HomePageProduct) => 
          product.imagine_produs && 
          product.imagine_logo && 
          product.imagine_sticla
        )
      : [];

    return validProducts;
  } catch (error) {
    console.error('Error fetching home page products:', error);
    return [];
  }
};