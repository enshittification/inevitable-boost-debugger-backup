<script lang=ts>
  import { onMount } from "svelte";
	import ModuleStatusTable from "../components/module-status-table.svelte";
	import { fetchModuleStatus } from "../util/fetch-module-status";
	import { getPageUrl } from "../util/page-url";
	import type { ModuleDataPayload } from "../types/module";

	let moduleData : ModuleDataPayload | null = null;
	let pageUrl : string | undefined = '';

	let moduleDataFetchIntervalId: number | undefined;

	async function updateModuleData() {
		try {
			moduleData = await fetchModuleStatus();
			if( moduleData ) {
				clearInterval( moduleDataFetchIntervalId );
			}
		} catch( error ) {
			console.error( error );
		}
	}

	onMount( async function() {
		await updateModuleData();
		moduleDataFetchIntervalId = setInterval( updateModuleData, 1000 );
		pageUrl = await getPageUrl();
	} );

	$: jetpackDebuggerUrl = pageUrl ? 'https://jptools.wordpress.com/debug/?url=' + encodeURIComponent( pageUrl ) : null;
</script>
<div class="jetpack-boost-debugger">
	<h1>Jetpack Boost Debugger</h1>
	{#if moduleData}
		<ModuleStatusTable moduleData={ moduleData } />
	{:else}
		Inspecting...
	{/if}

	{#if jetpackDebuggerUrl }
		<a href={jetpackDebuggerUrl} target="_blank">Jetpack Debugger</a>
	{/if}
</div>

<style>
	.jetpack-boost-debugger {
		width: 600px;
		max-width: 100%;
	}
</style>