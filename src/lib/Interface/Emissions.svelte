<script lang="ts">
    import {Em} from "$lib/Interface/StateManagement"

    //Screen 1
    let areaMinLat = 0.0;
    let areaMaxLat = 0.0;
    let areaMinLong = 0.0;
    let areaMaxLong = 0.0;

    let policyDuration = "One day";
    let severity = "Soft";

    // Screen 2
    let vehicleTypes = {
        commercial: false,
        private: false,
        electric: false
    };

    let exemptions = {
        emergency: false,
        residents: false,
        others: false
    };

    // Screen 3
    let enforcementMethods = {
        cameras: false,
        policePatrols: false,
        barriers: false
    };

    let budget = 0.0;

    let transportOptions = {
        newRoutes: false,
        increasedFrequency: false,
        improvedInfrastructure: false
    };

</script>

<div id="panel_Con">
<div id="em_panel">
    <div id="step_count">STEP {$Em}</div>
    <span id="step_title">
        {#if $Em === 1}
        General Policy Information
        {/if}
        {#if $Em === 2}
        Affected and Exempted Vehicles
        {/if}
        {#if $Em === 3}
        Implementation and Resources
        {/if}
        {#if $Em === 4}
        Overview
        {/if}
    </span>
    <div id="btns">
        <button id="pre" on:click={()=>{if ($Em > 1) {Em.set($Em-1)}}}>previous</button>
        <button id="next" on:click={()=>{if ($Em < 4) {Em.set($Em+1);}}}>{#if $Em != 4 }Next {:else} GO {/if}</button>
    </div>
    </div>
    <div id="progress_con">
        {#if $Em >= 1}
        <div class="progress"></div>
        {/if}
        {#if $Em >= 2}
        <div class="progress"></div>
        {/if}
        {#if $Em >= 3}
        <div class="progress"></div>
        {/if}
        {#if $Em >= 4}
        <div class="progress"></div>
        {/if}
    </div>
    <section id="em_content_con">
        {#if $Em === 1}
        <div class="content">
            <div class="content_headline">Area</div>
            <span class="content_disc">Specify the geographic region where the zero/low emission zone will be applied.</span>
            <div class="hor_content">
                <input type="number" step=".0001" class="number_input" placeholder="Min Latitude" bind:value={areaMinLat}>
                <input type="number" step=".0001" class="number_input" placeholder="Max Latitude" bind:value={areaMaxLat}>
                <input type="number" step=".0001" class="number_input" placeholder="Min Longitude" bind:value={areaMinLong}>
                <input type="number" step=".0001" class="number_input" placeholder="Max Longitude" bind:value={areaMaxLong}>
            </div>
            <div class="content_headline">Policy duration</div>
            <span class="content_disc">Indicate the time period for which the policy will be in effect.</span>
            <select id="duration" name="duration" class="content_selection" bind:value={policyDuration}>
                <option selected>One day</option>
                <option >One month</option>
                <option>One year</option>
            </select>
            <div class="content_headline">Severity</div>
            <span class="content_disc">Select the level of restrictions, from soft measures like time-based travel restrictions to hard measures like pedestrian-only zones.</span>
            <select id="Severity" name="Severity" class="content_selection" bind:value={severity}>
                <option selected>Soft</option>
                <option >Moderate</option>
                <option>Extreme</option>
            </select>
              
        </div>
        {:else if $Em === 2}
        <div class="content">
            <div class="content_headline">Types of vehicles affected</div>
            <span class="content_disc">Select the types of vehicles that will be affected by the policy (e.g., commercial, private, electric).</span>
            <div class="hor_content">
                <input type="checkbox" id="commercial" bind:checked={vehicleTypes.commercial}>
                <label for="commercial">Commercial</label><br>
                <input type="checkbox" id="private" bind:checked={vehicleTypes.private}>
                 <label for="private">Private</label><br>
                <input type="checkbox" id="electric" bind:checked={vehicleTypes.electric}>
                <label for="electric">Electric</label><br>
            </div>
        
            <div class="content_headline">Exemptions</div>
            <span class="content_disc">Specify any exemptions to the policy, such as emergency vehicles or residents.</span>
            <div class="hor_content">
                <input type="checkbox" id="emergency" bind:checked={exemptions.emergency}>
                <label for="emergency">Emergency Vehicles</label><br>
                <input type="checkbox" id="residents" bind:checked={exemptions.residents}>
                <label for="residents">Residents</label><br>
                <input type="checkbox" id="others" bind:checked={exemptions.others}>
                <label for="others">Others</label><br>
            </div>
        </div>
        
        {:else if $Em === 3}
        <div class="content">
            <div class="content_headline">Enforcement methods</div>
            <span class="content_disc">Specify how the policy will be enforced, such as through cameras or police patrols.</span>
            <div class="hor_content">
                <input type="checkbox" id="cameras" name="enforcement_methods" bind:checked={enforcementMethods["cameras"]}>
                <label for="cameras">Cameras</label><br>
                <input type="checkbox" id="police_patrols" name="enforcement_methods" bind:checked={enforcementMethods["policePatrols"]}>
                <label for="police_patrols">Police Patrols</label><br>
                <input type="checkbox" id="barriers" name="enforcement_methods" bind:checked={enforcementMethods["barriers"]}>
                <label for="barriers">Physical Barriers</label><br>
            </div>
        
            <div class="content_headline">Budget and resources allocated</div>
            <span class="content_disc">Indicate the budget and resources allocated for implementing the policy.</span>
            <div class="hor_content">
                <input type="number" step=".01" class="number_input" placeholder="Budget in CAD" bind:value={budget}>
            </div>
        
            <div class="content_headline">Public transportation options and enhancements</div>
            <span class="content_disc">Specify any public transportation options or enhancements to support the policy.</span>
            <div class="hor_content">
                <input type="checkbox" id="new_routes" name="transport_options" bind:checked={transportOptions["newRoutes"]}>
                <label for="new_routes">New Routes</label><br>
                <input type="checkbox" id="increased_frequency" name="transport_options" bind:checked={transportOptions["increasedFrequency"]}>
                <label for="increased_frequency">Increased Frequency</label><br>
                <input type="checkbox" id="improved_infrastructure" name="transport_options" bind:checked={transportOptions["improvedInfrastructure"]}>
                <label for="improved_infrastructure">Improved Infrastructure</label><br>

            </div>
        </div>
        
        {:else if $Em === 4}
        <div class="content">
            <span class="content_disc">Review the details of your zero/low emission zone policy below.</span>
            
            <div class="overview_section">
                <div class="overview_headline">Area: </div>
                <div id="overview_area" class="overview_content">
                    Min Latitude: {areaMinLat}<br>  
                    Max Latitude: {areaMaxLat} <br>
                    Min Longitude: {areaMinLong} <br>
                    Max Longitude: {areaMaxLong}
                </div>
            </div>
            
            <div class="overview_section">
                <div class="overview_headline">Policy Duration: </div>
                <div id="overview_duration" class="overview_content">{policyDuration}</div>
            </div>
            
            <div class="overview_section">
                <div class="overview_headline">Severity: </div>
                <div id="overview_severity" class="overview_content">{severity}</div>
            </div>
            
            <div class="overview_section">
                <div class="overview_headline">Types of Vehicles Affected: </div>
                <div id="overview_vehicles" class="overview_content">
                    Commercial: {vehicleTypes.commercial ? 'Yes' : 'No'}<br>
                    Private: {vehicleTypes.private ? 'Yes' : 'No'}<br>
                    Electric: {vehicleTypes.electric ? 'Yes' : 'No'}
                </div>
            </div>
            
            <div class="overview_section">
                <div class="overview_headline">Exemptions: </div>
                <div id="overview_exemptions" class="overview_content">
                    Emergency Vehicles: {exemptions.emergency ? 'Yes' : 'No'}<br>
                    Residents: {exemptions.residents ? 'Yes' : 'No'}<br>
                    Others: {exemptions.others ? 'Yes' : 'No'}
                </div>
            </div>
            
            <div class="overview_section">
                <div class="overview_headline">Enforcement Methods: </div>
                <div id="overview_enforcement" class="overview_content">
                    Cameras: {enforcementMethods.cameras ? 'Yes' : 'No'}<br>
                    Police Patrols: {enforcementMethods.policePatrols ? 'Yes' : 'No'}<br>
                    Physical Barriers: {enforcementMethods.barriers ? 'Yes' : 'No'}
                </div>
            </div>
            
            <div class="overview_section">
                <div class="overview_headline">Budget and Resources Allocated: </div>
                <div id="overview_budget" class="overview_content">${budget}</div>
            </div>
            
            <div class="overview_section">
                <div class="overview_headline">Public Transportation Options and Enhancements: </div>
                <div id="overview_transport" class="overview_content">
                    New Routes: {transportOptions.newRoutes ? 'Yes' : 'No'}<br>
                    Increased Frequency: {transportOptions.increasedFrequency ? 'Yes' : 'No'}<br>
                    Improved Infrastructure: {transportOptions.improvedInfrastructure ? 'Yes' : 'No'}
                </div>
            </div>
        </div>
        {/if}
    </section>
</div>

<style>
    @import "@fontsource/poppins";
    @import "@fontsource/poppins/600.css";
    #panel_Con {
        position: absolute;
        top: 6%;
        left: 10%;
        right: 10%;
    }
    #em_panel {
        height: 3.5rem;
        background-color: lightgray;
        border: 2px solid darkgray;
        border-radius: 40px;
        z-index: 101;
        display: flex;
        flex-direction: row;
        font-family: "poppins", sans-serif;
        user-select: none;
    }
    #step_count {
        width: 10rem;
        height: 100%;
        background-color: var(--brand_main);
        border-radius: 40px 0 0 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: var(--brand_white);
        font-size: 1.25rem;
        font-weight: 600;
    }
    #step_title {
        height: 100%;
        margin-left: 1.5rem;
        font-size: 1.5rem;
        font-weight: 600;
        display: flex;
        align-items: center;
    }
    #progress_con {
        display: flex;
        flex-direction: row;
        gap: 5px;
        align-items: flex-end;
        margin-top: .5rem;
    }
    .progress {
        width: 25%;
        height: 5px;
        background-color: var(--brand_main);
    }
    #btns {
        height: 100%;
        display: flex;
        align-items: center;
        margin-left: auto;
    }
    #btns button {
        height: 100%;
        padding: 0.75rem;
        cursor: pointer;
        font-size: 1.25rem;
    }
    #pre {
        border: none;
        background:none;
        font-weight: 600;
    }
    #next {
        width: 10rem;
        border-radius:0 40px 40px 0;
        border: none;
        background-color: var(--brand_main);
        color: white;
        font-size: 1.75rem;
    }
    #em_content_con {
        width: 100%;
        margin-top: 1rem;
        padding-inline: 2rem;
        padding-block: 1rem 4rem;
        background-color: rgba(211, 211, 211, .7);
        border: 2px solid darkgray;
        border-radius: 10px;
        backdrop-filter: blur(5px);
        box-sizing: border-box;
    }
    /**Content Area**/
    .content, .hor_content {
        display: flex;
        width: 100%;
        align-items: center;
        user-select: none;
        font-family: "poppins", sans-serif;
        gap: 0.5rem;
    }
    .content {
        flex-direction: column;
    }
    .hor_content {
        flex-direction: row;
        justify-content: center;
    }
    .content_headline {
        width: 100%;
        border-bottom: 1px darkgray solid;
        font-weight: 600;
        margin-top: 1.5rem;
        font-size: 1.5rem;
        padding-bottom: 0.25rem;
    }
    .content_disc {
        width: 100%;
        margin-bottom: 0.75rem;
    }
    .number_input, .content_selection {
        width: 10rem;
        height: 2.5rem;
        border: 2px solid darkgray;
    }
    .content_selection {
        font-family: "poppins", sans-serif;
        font-weight: 600;
    }
    .overview_section {
        width: 100%;
        display: flex;
        flex-direction: row;
    }
    .overview_headline {
        font-weight: 700;

    }
    .overview_content {
        margin-left: 1rem;
    }
</style>