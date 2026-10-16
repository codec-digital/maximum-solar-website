<script>
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';

	let mapContainer;
	let map;
	let leaflet;

	// Maximum Solar office details for the popups
	const offices = [
		{
			name: 'Maximum Solar Hobart',
			address: 'Warehouse 3, Lot 4/21 South Arm Hwy<br>Mornington TAS 7018',
			lat: -42.8596256,
			lng: 147.3927031
		},
		{
			name: 'Maximum Solar Melbourne',
			address: '4 Expo Court<br>Mount Waverley VIC 3149',
			lat: -37.893802,
			lng: 145.128766
		}
	];
	const phone = '1300 457 542';
	const email = 'info@maximumsolar.com.au';

	onMount(async () => {
		if (browser) {
			try {
				// Dynamic import to avoid SSR issues
				leaflet = await import('leaflet');

				// Import CSS
				await import('leaflet/dist/leaflet.css');

				// Fix default markers icon path issue with Vite
				delete leaflet.Icon.Default.prototype._getIconUrl;
				leaflet.Icon.Default.mergeOptions({
					iconRetinaUrl:
						'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
					iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
					shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png'
				});

				// Initialize map with attribution control disabled
				map = leaflet.map(mapContainer, {
					scrollWheelZoom: true,
					dragging: true,
					touchZoom: true,
					doubleClickZoom: true,
					boxZoom: true,
					keyboard: true,
					zoomControl: true,
					attributionControl: false // Remove Leaflet attribution
				});

				// Add OpenStreetMap tiles without attribution
				leaflet
					.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
						maxZoom: 19
						// No attribution property to remove branding
					})
					.addTo(map);

				// Create custom popup content
				/** @param {(typeof offices)[number]} office */
				const popupContent = ({ name, address, lat, lng }) => `
          <div class="p-3 min-w-[200px]">
            <h3 class="font-bold text-lg mb-2 text-gray-800">${name}</h3>
            <div class="space-y-2 text-sm">
              <div class="flex items-start">
                <svg class="w-4 h-4 mt-0.5 mr-2 text-gray-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                <span class="text-gray-700">${address}</span>
              </div>
              <div class="flex items-center">
                <svg class="w-4 h-4 mr-2 text-gray-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                </svg>
                <a href="tel:1300457542" class="text-blue-600 hover:text-blue-800">${phone}</a>
              </div>
              <div class="flex items-center">
                <svg class="w-4 h-4 mr-2 text-gray-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
                <a href="mailto:${email}" class="text-blue-600 hover:text-blue-800">${email}</a>
              </div>
            </div>
            <div class="mt-3 pt-2 border-t">
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m-6 3l6-3"></path>
                </svg>
                Get Directions
              </a>
            </div>
          </div>
        `;

				// Add a marker with popup for each office
				offices.forEach((office) => {
					leaflet
						.marker([office.lat, office.lng])
						.addTo(map)
						.bindPopup(popupContent(office), {
							maxWidth: 300,
							className: 'custom-popup'
						});
				});

				// Fit the view so every office is visible
				map.fitBounds(
					offices.map((office) => [office.lat, office.lng]),
					{ padding: [40, 40] }
				);
			} catch (error) {
				console.error('Error loading map:', error);
			}
		}
	});

	onDestroy(() => {
		if (map) {
			map.remove();
		}
	});
</script>

<!-- Map Container -->
<div
	bind:this={mapContainer}
	class="h-96 w-full rounded-lg border border-gray-200 shadow-lg lg:h-full"
	aria-label="Interactive map showing Maximum Solar office locations"
></div>

<!-- Map Loading Fallback -->
{#if !browser}
	<div
		class="flex h-96 w-full items-center justify-center rounded-lg border border-gray-200 bg-gray-100 shadow-lg"
	>
		<div class="text-center">
			<svg
				class="mx-auto mb-4 h-12 w-12 text-gray-400"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
				></path>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
				></path>
			</svg>
			<p class="text-gray-600">Loading interactive map...</p>
		</div>
	</div>
{/if}

<style>
	:global(.leaflet-container) {
		font-family: inherit;
		border-radius: 0.5rem;
	}

	:global(.custom-popup .leaflet-popup-content-wrapper) {
		border-radius: 0.5rem;
		box-shadow:
			0 10px 25px -5px rgba(0, 0, 0, 0.1),
			0 4px 6px -2px rgba(0, 0, 0, 0.05);
	}

	:global(.custom-popup .leaflet-popup-tip) {
		background: white;
	}

	:global(.leaflet-popup-content) {
		margin: 0 !important;
	}

	/* Hide any remaining attribution elements */
	:global(.leaflet-control-attribution) {
		display: none !important;
	}

	/* Hide Leaflet link if it somehow appears */
	:global(.leaflet-control-attribution a[href*='leafletjs']) {
		display: none !important;
	}
</style>
