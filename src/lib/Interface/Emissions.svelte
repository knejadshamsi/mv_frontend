<script lang="ts">
    import {Em, state, finalArea} from "$lib/Interface/StateManagement"

    let policyDuration = "One day";
    let severity = "Soft";

    let vehicleTypes = {
        emergency:false,
        commercial: false,
        private: false,
        electric: false,
        residents:false
    };

    let enforcementMethods = {
        cameras: false,
        barriers: false
    };

    let outputOptions = {
        trafficFlow: false,
        population: false,
        suggestions: false,
        finance:false
    }

    let stepName = "Welcome"
    let stepNames = ["Welcome", "General Policy Information", "Exemptions and Enforcement methods", "Implementation and Resources", "Overview"]
    const stepsManager = (action: string) => {
        if (action === "next") {
            if ($Em < 5) {Em.set($Em+1); stepName = stepNames[$Em - 1]}
            if ($Em === 5) {state.set("Results")}
            
        } else {
            if ($Em > 1) {Em.set($Em-1); stepName = stepNames[$Em - 1]}
        }
    }
    $: exemptionCount = Object.values(vehicleTypes).filter(Boolean).length;
    $: enforcementCount = Object.values(enforcementMethods).filter(Boolean).length;

  $: explanation = generateExplanation(vehicleTypes, enforcementMethods, exemptionCount, enforcementCount);

  function generateExplanation(types, methods, exemptCount, enforceCount) {
    let text = "";

    // Exemptions
    if (exemptCount > 0) {
      text += `This policy includes ${exemptCount} exemption${exemptCount > 1 ? 's' : ''}. `;
      
      if (types.emergency) text += "Emergency vehicles will maintain uninterrupted critical services. ";
      if (types.commercial) text += "Commercial vehicles can continue smooth business operations. ";
      if (types.private) text += "Private vehicles may face restrictions to reduce emissions and congestion. ";
      if (types.electric) text += "Electric vehicles are encouraged as a cleaner option. ";
      if (types.residents) text += "Residents will have free movement within their neighborhood. ";
      
      text += "\n\n";
    } else {
      text += "No exemptions have been selected, indicating a strict policy application across all vehicle types. ";
    }

    // Enforcement
    if (enforceCount > 0) {
      text += `Enforcement will be carried out using ${enforceCount} method${enforceCount > 1 ? 's' : ''}. `;
      
      if (methods.cameras) {
        text += "Camera systems will be employed for monitoring, potentially generating revenue through fines or passes. ";
      }
      
      if (methods.barriers) {
        text += "Physical barriers will be implemented, directly impacting traffic flow. The severity of these barriers can range from blocking key streets to imposing stringent area-wide restrictions. ";
      }
    } else {
      text += "No enforcement methods have been selected yet. Consider how the policy will be implemented effectively. ";
    }

    return text;
  }

  $: selectedOutputs = Object.values(outputOptions).filter(Boolean).length;
  $: outputExplanation = generateOutputExplanation(outputOptions, selectedOutputs);
  function generateOutputExplanation(options, count:number) {
    let text = "";

    if (count > 0) {
      text += `You've selected ${count} output option${count > 1 ? 's' : ''} for your analysis. `;

      let details = [];
      if (options.trafficFlow) details.push("traffic flow patterns");
      if (options.population) details.push("demographic impacts");
      if (options.suggestions) details.push("improvement recommendations");
      if (options.finance) details.push("financial projections");

      text += `This will provide insights into ${details.join(', ')}. `;

      text += "\n\n";

      if (options.trafficFlow) {
        text += "Traffic Flow analysis will help optimize road usage and identify congestion points. ";
      }
      if (options.population) {
        text += "Population impact assessment will reveal how different demographic groups are affected. ";
      }
      if (options.suggestions) {
        text += "Improvement suggestions will offer data-driven recommendations to enhance policy effectiveness. ";
      }
      if (options.finance) {
        text += "Financial projections will estimate costs, potential revenues, and overall economic impact. ";
      }

      // Add processing time estimate
      text += "\n\n";
      text += getProcessingTimeEstimate(count);
    } else {
      text += "No output options have been selected. Choose the types of analysis you'd like to include in your results. ";
    }

    return text;
  }

  function getProcessingTimeEstimate(count:number) {
    switch(count) {
      case 1:
        return "It will take a little bit to get the result ready for you.";
      case 2:
        return "It will take some time to prepare your results.";
      case 3:
        return "Please be patient, as it will take a while to generate your comprehensive results.";
      case 4:
        return "It will take a long time to get the detailed results ready. This thorough analysis requires significant processing.";
      default:
        return "";
    }
  }
</script>

<div id="panel_Con">
<div id="em_panel">
    <div id="step_count">{`${$Em}.`}</div>
    <span id="step_title">{stepName}</span>
    </div>
    <div id="progress_con">
        <div id="progress" style:width={Math.floor(($Em / 5)*100) + "%"}></div>
    </div>
    <section id="em_content_con">
        {#if $Em === 1}
        <div class="content">
            <div id="welcome_content">
                <h2>Welcome to the Z.E.L.E Impact Analysis Tool!</h2>
            <p>This tool is designed to help policymakers evaluate the impact of zero and low-emission zones on urban traffic flow, air quality, and CO2 emissions and see the potential outcomes. 
                The tool provides detailed insights into how these policies can reduce CO2 emissions, improve air quality, and manage traffic effectively. 
                Use this tool to make informed decisions for a sustainable urban environment.</p>
                <div class="bold">Expected Outcomes:</div>
                <ul>
                    <li><strong>Area Overview</strong>: Provides a summary of key findings, high-level statistics, and main visualizations related to the selected area, focusing on how zero and low-emission zones impact urban traffic flow and general metrics.</li>
                    <li><strong>Accessibility Analysis</strong>: Examines the impact of emission policies on accessibility to businesses, amenities, and public transportation within and around the selected zone.</li>
                    <li><strong>CO2 Emission and Air Quality</strong>: Measures changes in CO2 emissions and air quality, offering insights into environmental benefits and identifying areas with significant improvements.</li>
                    <li><strong>Comparisons</strong>: Compares different policy scenarios to highlight their short-term and long-term effects on traffic flow, air quality, and CO2 emissions, helping to identify the most effective strategies.</li>
                </ul>
                
                <div class="bold">Inputs You'll Provide:</div>
                <p>You'll select the geographic region for analysis, define the severity level of emission restrictions, specify vehicle exemptions (e.g., emergency, commercial, private, electric), and choose enforcement methods like cameras or physical barriers to tailor the impact analysis and understand the practical implications of policy implementation.</p>
                
            </div>
        </div>
        {:else if $Em === 2}
        <div class="content">
            <div class="content_headline">Area</div>
            <span class="content_disc">Specify the geographic region where the zero/low emission zone will be applied.</span>
            {#if $finalArea.length >1}
             <span id="area_selected"> Area selected. </span>
            {:else}
            <button id="select_area" class="form_btn" on:click={()=>state.set("MapSelection")}>Select area</button>
            {/if}
            <div class="content_headline">Severity</div>
            <span class="content_disc">Select the level of restrictions, from soft measures like time-based travel restrictions to hard measures like pedestrian-only zones.</span>
            <div class="content_selection">
                <input type="radio" id="soft" name="severity" value="Soft" bind:group={severity} />
                <label for="soft">Soft</label>
                <input type="radio" id="moderate" name="severity" value="Moderate" bind:group={severity} />
                <label for="moderate">Moderate</label>
                <input type="radio" id="extreme" name="severity" value="Extreme" bind:group={severity} />
                <label for="extreme">Extreme</label>
            </div>
            <div class="explanation"> <strong>Explanation:</strong>
                {#if severity === "Soft"}
                Only popular streets near points of interest and amenities will be blocked off. This level is designed to minimize disruption while still providing some control over vehicle access in key areas.
                {:else if severity === "Moderate"}
                An algorithm will recommend a solution where the least amount of money is spent on barriers while achieving maximum blockage. This level balances cost-efficiency with effective area control, selectively blocking streets to optimize traffic flow and access.
                {:else if severity === "Extreme"}
                The majority of the area will be blocked off. This level involves extensive use of physical barriers to restrict vehicle access, prioritizing safety and environmental benefits over convenience and cost.
                {/if}
            </div>
        </div>
        {:else if $Em === 3}
        <div class="content">
            <div class="content_headline">Exemptions</div>
            <span class="content_disc">Select the types of vehicles that will be affected by the policy.</span>
            <div class="hor_content">
                <div class="check_con"><input type="checkbox" id="Emergency" bind:checked={vehicleTypes.emergency}>
                <label for="Emergency">Emergency Vehicles</label></div>
                <div class="check_con"><input type="checkbox" id="commercial" bind:checked={vehicleTypes.commercial}>
                <label for="commercial">Commercial Vehicles</label></div>
                <div class="check_con"><input type="checkbox" id="private" bind:checked={vehicleTypes.private}>
                 <label for="private">Private Vehicles</label></div>
                <div class="check_con"><input type="checkbox" id="electric" bind:checked={vehicleTypes.electric}>
                <label for="electric">Electric Vehicles</label></div>
                <div class="check_con"><input type="checkbox" id="residents" bind:checked={vehicleTypes.residents}>
                <label for="residents">Residents</label></div>
            </div>

            <div class="content_headline">Enforcement methods</div>
            <span class="content_disc">Specify how the policy will be enforced, such as through cameras or police patrols.</span>
            <div class="hor_content">
                <div class="check_con"><input type="checkbox" id="cameras" name="enforcement_methods" bind:checked={enforcementMethods["cameras"]}>
                <label for="cameras">Cameras</label></div>
                <div class="check_con"><input type="checkbox" id="barriers" name="enforcement_methods" bind:checked={enforcementMethods["barriers"]}>
                <label for="barriers">Physical Barriers</label></div>
            </div>
            <div class="explanation"> <strong>Explanation: </strong>{explanation}</div>
        </div>
        
        {:else if $Em === 4}
        <div class="content">
            <div class="content_headline">Output options</div>
            <span class="content_disc">Specify how the outputs that you wish to be included in result.</span>
            <div class="ver_content">
                <div class="check_con"><input type="checkbox" id="trafficFlow" name="trafficFlow" bind:checked={outputOptions["trafficFlow"]}>
                <label for="trafficFlow">Include Traffic flow</label></div>
                <div class="check_con"><input type="checkbox" id="population" name="population" bind:checked={outputOptions["population"]}>
                <label for="population">Include Affected population</label></div>
                <div class="check_con"><input type="checkbox" id="suggestions" name="suggestions" bind:checked={outputOptions["suggestions"]}>
                <label for="suggestions">Include Affected population</label></div>
                <div class="check_con"><input type="checkbox" id="finance" name="finance" bind:checked={outputOptions["finance"]}>
                <label for="finance">Include Financial Projection</label></div>
            </div>
            <div class="explanation"> <strong>Explanation: </strong>{outputExplanation}</div>
        </div>
        
        {:else if $Em === 5}
        <div class="content">
            <span class="content_disc" id="overview_start">Review the details of your zero/low emission zone policy below.</span>
            
            <div class="overview_section">
                <div class="overview_headline">Area: </div> <div class="overview_content">Selected</div>
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
                <div class="overview_headline">Exemptions: </div>
                <div id="overview_vehicles" class="overview_content">
                    Emergency Vehicles: {vehicleTypes.emergency ? 'Yes' : 'No'}<br>
                    Commercial Vehicles: {vehicleTypes.commercial ? 'Yes' : 'No'}<br>
                    Private Vehicles: {vehicleTypes.private ? 'Yes' : 'No'}<br>
                    Electric Vehicles: {vehicleTypes.electric ? 'Yes' : 'No'}<br>
                    Residents: {vehicleTypes.residents ? 'Yes' : 'No'}<br>
                </div>
            </div>
            
            <div class="overview_section">
                <div class="overview_headline">Enforcement Methods: </div>
                <div id="overview_enforcement" class="overview_content">
                    Cameras: {enforcementMethods.cameras ? 'Yes' : 'No'}<br>
                    Physical Barriers: {enforcementMethods.barriers ? 'Yes' : 'No'}
                </div>
            </div>
            
            <div class="overview_section">
                <div class="overview_headline">Output options</div>
                <div id="overview_transport" class="overview_content">
                    Include Traffic flow: {outputOptions.trafficFlow ? 'Yes' : 'No'}<br>
                    Increased Frequency: {outputOptions.population ? 'Yes' : 'No'}<br>
                    Include Affected population: {outputOptions.suggestions ? 'Yes' : 'No'}<br>
                    Include Financial Projection: {outputOptions.suggestions ? 'Yes' : 'No'}
                </div>
            </div>
        </div>
        {/if}
        <div class="next_pre" id="content_footer">{#if $Em != 1}<button id="pre" class="np_btn" on:click={()=>{stepsManager('pre')}}>Previous</button>{/if}
            <button id="next" class="np_btn" on:click={()=>{stepsManager('next')}}>{#if $Em === 5} GO{:else}Next{/if}</button></div>
    </section>
</div>

<style>
    @import "@fontsource/poppins";
    @import "@fontsource/poppins/600.css";
    #panel_Con {
        position: absolute;
        top: 4%;
        right: 3%;
        width: 55rem;
    }
    #em_panel {
        width: 100%;
        height: 3.5rem;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        background-color: var(--brand_main);
        z-index: 101;
        font-family: "poppins", sans-serif;
        user-select: none;
    }
    #step_con {
        flex-grow: 1;
        display: flex;
        justify-content: center;
    }
    #step_count {
        width: 3rem;
        height: 100%;
        background-color: var(--brand_main);
        display: flex;
        justify-content: center;
        align-items: center;
        color: var(--brand_white);
        font-size: 1.25rem;
        font-weight: 600;
    }
    #step_title {
        height: 100%;
        font-size: 1.5rem;
        font-weight: 600;
        display: flex;
        align-items: center;
        background-color: var(--brand_main);
        color: var(--brand_white);
        text-transform: uppercase;
    }
    #progress_con {
        margin-top: 5px;
        width: 100%;
        height: 10px;
        position: relative;
    }
    #progress {
        height: 100%;
        background-color: var(--brand_main);
        position: absolute;
        left: 0;
        bottom: 0;
        transition: width 0.3s ease;
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
    .np_btn {
        width: 8rem;
        height: 3rem;
        background: none;
        border: none;
        font-weight: 600;
        font-size: 1rem;
        cursor: pointer;
        text-transform: uppercase;
    }
    .next_pre {
        width: 100%;
        margin-block: 0.25rem;
    }
    #content_footer {
        height: 4rem;
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }
    #pre {
        margin-top: 0.5rem;
        color: var(--brand_main);
        font-weight: 800;
        font-size: 1.3rem;
        margin-right: 1rem;
        margin-bottom: 0.5rem;
    }
    #next {
        float: right;
        background-color: var(--brand_main);
        color: var(--brand_white);
        font-weight: 800;
    }
    #em_content_con {
        width: 100%;
        height: 60rem;
        margin-top: 1rem;
        padding-top: 1rem;
        padding-inline:0.75rem;
        background-color: rgba(211, 211, 211, .7);
        border: 2px solid darkgray;
        backdrop-filter: blur(5px);
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
    }
    #welcome_content {
        width: 100%;
    }
    #welcome_content h2 {
        width: 25ch;
        font-size: 2rem;
        font-weight: 800;
        margin: auto;
        padding-block:1.25rem 0;
        text-align: center;
    }
    #welcome_content p {
        font-size: 1.2rem;
        padding-inline: 1.5rem;
    }
    #welcome_content ul {
        padding-left: 3.5rem;
        font-size: 1.125rem;
    }
    .bold {
        font-size: 1.25rem;
        font-weight: 800;
        padding-inline: 1.5rem;
    }
    /**Content Area**/
    .content, .hor_content {
        display: flex;
        width: 100%;
        align-items: center;
        font-family: "poppins", sans-serif;
        gap: 0.5rem;
    }
    .content {
        flex-grow: 1;
        flex-direction: column;
        user-select: none;
    }
    .form_btn {
        width: 10rem;
        height: 2.5rem;
        border: 2px solid darkgray;
        font-weight: 600;
        cursor: pointer;
        transform: scale(1.125);
    }
    .hor_content {
        flex-direction: row;
        justify-content: center;
        font-size: 1rem;
        flex-wrap: wrap;
    }
    .ver_content {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
    }
    .check_con {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 0.25rem;
    }
    .check_con label {
        font-size: 1.25rem;
        font-weight: 550;
        margin-left: 0.25rem;
    }
    .check_con input {
        width: 1.25rem;
        aspect-ratio: 1/1;
    }
    .content_headline {
        width: 100%;
        border-bottom: 1px darkgray solid;
        font-weight: 800;
        margin-top: 1.5rem;
        font-size: 1.25rem;
        padding-bottom: 0.25rem;
    }
    .content_disc {
        width: 100%;
        margin-bottom: 0.75rem;
        font-size: 1.125rem;
    }
    .content_selection {
        width: 18rem;
        height: 2.5rem;
        display: flex;
        flex-direction: row;
        margin-block: 1.25rem;
        position: relative;
        justify-content: space-around;
        align-items: center;
        border: 2px solid darkgray;
        border-radius: 5px;
        transform: scale(1.125);
    }
    .content_selection input[type="radio"] {
        margin-right: 5px;
        position: absolute;
        bottom: 0;
        display: none;
    }
    .content_selection input[type="radio"]:checked + label {
        background-color: var(--brand_main);
        color: var(--brand_white);
    }
    .content_selection label {
        width: 6rem;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        transition: background-color 0.3s, color;
        }
    .content_selection {
        font-family: "poppins", sans-serif;
        font-weight: 600;
    }
    .explanation {
        width: 100%;
        font-size: 1.125rem;
        margin-top: 0.75rem;
    }
    #overview_start {
        padding-top: 1rem;
        font-size: 1.25rem;
    }
    .overview_section {
        width: 100%;
        display: flex;
        flex-direction: row;
    }
    .overview_headline {
        font-weight: 700;
        font-size: 1.25rem;

    }
    .overview_content {
        margin-left: 1rem;
        font-size: 1.25rem;
    }
    #area_selected {
        font-weight: 900;
        font-size: 1.25rem;
        color: var(--brand_main);
    }
</style>