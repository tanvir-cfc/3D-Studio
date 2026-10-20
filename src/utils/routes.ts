import { PageId } from '../App';
import { getServiceById } from '../data/servicesData';

export interface RouteState {
  page: PageId;
  serviceId?: string;
}

/**
 * Universal Route Parser that safely inspects window.location.hash,
 * window.location.pathname, and window.location.search.
 * This guarantees any link copied and shared with clients opens the exact
 * intended single service or subpage across all browsers, email clients, and preview servers.
 */
export function parseRoute(): RouteState {
  if (typeof window === 'undefined') {
    return { page: 'home' };
  }

  const hash = window.location.hash || '';
  const pathname = window.location.pathname || '';
  const search = new URLSearchParams(window.location.search);

  // 1. Check query parameters first if present (e.g. ?page=services or ?service=3d-modeling)
  const queryService = search.get('service') || search.get('id');
  const queryPage = search.get('page');

  if (queryService) {
    return {
      page: 'service-detail',
      serviceId: queryService,
    };
  }

  if (queryPage) {
    const validPages: PageId[] = ['home', 'services', 'service-detail', 'models', 'portfolio', 'estimator', 'contact'];
    if (validPages.includes(queryPage as PageId)) {
      if (queryPage === 'service-detail') {
        return {
          page: 'service-detail',
          serviceId: search.get('id') || '3d-modeling',
        };
      }
      return { page: queryPage as PageId };
    }
  }

  // 2. Check hash route (e.g. #/services/3d-modeling or #/portfolio)
  if (hash.startsWith('#')) {
    const cleanHash = hash.replace(/^#\/?/, '/');
    const parts = cleanHash.split('/').filter(Boolean);

    if (parts.length === 0) {
      return { page: 'home' };
    }

    const firstSegment = parts[0].toLowerCase();

    if (firstSegment === 'services') {
      if (parts[1]) {
        return {
          page: 'service-detail',
          serviceId: parts[1],
        };
      }
      return { page: 'services' };
    }

    if (firstSegment === 'service' && parts[1]) {
      return {
        page: 'service-detail',
        serviceId: parts[1],
      };
    }

    if (firstSegment === 'models' || firstSegment === '3d-studio' || firstSegment === 'viewer') {
      return { page: 'models' };
    }

    if (firstSegment === 'portfolio' || firstSegment === 'work' || firstSegment === 'projects') {
      return { page: 'portfolio' };
    }

    if (firstSegment === 'estimator' || firstSegment === 'pricing' || firstSegment === 'calculator') {
      return { page: 'estimator' };
    }

    if (firstSegment === 'contact' || firstSegment === 'commission' || firstSegment === 'brief') {
      return { page: 'contact' };
    }

    if (firstSegment === 'home') {
      return { page: 'home' };
    }
  }

  // 3. Check pathname (e.g. /services/3d-modeling)
  const pathParts = pathname.split('/').filter(Boolean);
  if (pathParts.length > 0) {
    const firstSegment = pathParts[0].toLowerCase();

    if (firstSegment === 'services') {
      if (pathParts[1]) {
        return {
          page: 'service-detail',
          serviceId: pathParts[1],
        };
      }
      return { page: 'services' };
    }

    if (firstSegment === 'models' || firstSegment === '3d-studio') {
      return { page: 'models' };
    }

    if (firstSegment === 'portfolio') {
      return { page: 'portfolio' };
    }

    if (firstSegment === 'estimator') {
      return { page: 'estimator' };
    }

    if (firstSegment === 'contact') {
      return { page: 'contact' };
    }
  }

  return { page: 'home' };
}

/**
 * Returns canonical relative hash path (e.g. "#/services/photorealistic-rendering")
 */
export function getRouteHash(page: PageId, serviceId?: string): string {
  switch (page) {
    case 'home':
      return '#/';
    case 'services':
      return '#/services';
    case 'service-detail':
      return `#/services/${serviceId || '3d-modeling'}`;
    case 'models':
      return '#/models';
    case 'portfolio':
      return '#/portfolio';
    case 'estimator':
      return '#/estimator';
    case 'contact':
      return '#/contact';
    default:
      return '#/';
  }
}

/**
 * Returns full absolute URL that can be directly shared via email, Slack, or client proposals
 * E.g. "https://domain.com/#/services/photorealistic-rendering"
 */
export function getFullShareableUrl(page: PageId, serviceId?: string): string {
  if (typeof window === 'undefined') {
    return getRouteHash(page, serviceId);
  }
  const origin = window.location.origin;
  const pathname = window.location.pathname;
  const hash = getRouteHash(page, serviceId);
  return `${origin}${pathname}${hash}`;
}

/**
 * Updates browser history, hash, and dynamic document.title
 */
export function syncRouteWithBrowser(page: PageId, serviceId?: string, replaceHistory: boolean = false) {
  if (typeof window === 'undefined') return;

  const targetHash = getRouteHash(page, serviceId);

  // Update hash if changed
  if (window.location.hash !== targetHash) {
    if (replaceHistory) {
      window.history.replaceState(null, '', targetHash);
    } else {
      window.location.hash = targetHash;
    }
  }

  // Synchronize document.title for client preview and tab labeling
  if (page === 'service-detail' && serviceId) {
    const s = getServiceById(serviceId);
    if (s) {
      document.title = `${s.title} — 3D Modeling Company`;
      return;
    }
  }

  const titles: Record<PageId, string> = {
    home: '3D Modeling Company — Photorealistic CGI & Real-Time 3D Assets',
    services: '3D Capabilities & Services Directory — 3D Modeling Company',
    'service-detail': 'Service Specifications — 3D Modeling Company',
    models: 'Interactive 3D Studio & Real-Time Viewer — 3D Modeling Company',
    portfolio: 'Commercial 3D Showcase & Render Portfolio — 3D Modeling Company',
    estimator: 'Instant 3D Production Estimator — 3D Modeling Company',
    contact: 'Commission 3D Assets & Proposal Brief — 3D Modeling Company',
  };

  document.title = titles[page] || '3D Modeling Company';
}
