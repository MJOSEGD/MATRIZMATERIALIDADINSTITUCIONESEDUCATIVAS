const esgTopics = [
  // Environmental Topics
  {
    name: "Gestión de Residuos",
    category: "Environmental",
    esrs: "E9",
    ods: "12",
    kpi: "Tasa de reciclaje en campus (%)",
    taxonomy: "esrs_WasteManagement",
    priority: { min: 40, max: 80 }
  },
  {
    name: "Energía",
    category: "Environmental",
    esrs: "E1",
    ods: "7",
    kpi: "Consumo energético por estudiante (kWh)",
    taxonomy: "esrs_EnergyConsumption",
    priority: { min: 30, max: 70 }
  },
  {
    name: "Gestión del Agua",
    category: "Environmental",
    esrs: "E2",
    ods: "6",
    kpi: "Consumo de agua por estudiante (m³)",
    taxonomy: "esrs_WaterResourceManagement",
    priority: { min: 30, max: 70 }
  },
  {
    name: "Biodiversidad",
    category: "Environmental",
    esrs: "E4",
    ods: "15",
    kpi: "Área verde por estudiante (m²)",
    taxonomy: "esrs_BiodiversityImpact",
    priority: { min: 20, max: 60 }
  },
  {
    name: "Emisiones",
    category: "Environmental",
    esrs: "E5",
    ods: "13",
    kpi: "Huella de carbono por estudiante (tCO₂e)",
    taxonomy: "esrs_EmissionsReduction",
    priority: { min: 30, max: 70 }
  },
  {
    name: "Construcción Sostenible",
    category: "Environmental",
    esrs: "E6",
    ods: "11",
    kpi: "Espacios educativos certificados (%)",
    taxonomy: "esrs_SustainableConstruction",
    priority: { min: 40, max: 80 }
  },
  {
    name: "Economía Circular",
    category: "Environmental",
    esrs: "E8",
    ods: "12",
    kpi: "Material escolar reciclado (%)",
    taxonomy: "esrs_CircularEconomy",
    priority: { min: 50, max: 90 }
  },
  {
    name: "Consumo Responsable",
    category: "Environmental",
    esrs: "E11",
    ods: "12",
    kpi: "Uso de productos sostenibles (%)",
    taxonomy: "esrs_ResponsibleConsumption",
    priority: { min: 20, max: 100 }
  },
  {
    name: "Compra Sostenible",
    category: "Environmental",
    esrs: "E12",
    ods: "12",
    kpi: "Porcentaje de proveedores sostenibles",
    taxonomy: "esrs_SustainableProcurement",
    priority: { min: 45, max: 100 }
  },
  {
    name: "Movilidad y Transportes",
    category: "Environmental",
    esrs: "E13",
    ods: "11",
    kpi: "Reducción de emisiones por transporte (%)",
    taxonomy: "esrs_TransportEmissions",
    priority: { min: 40, max: 100 }
  },
  // Social Topics
  {
    name: "Calidad Educativa",
    category: "Social",
    esrs: "S1",
    ods: "4",
    kpi: "Tasa de rendimiento académico (%)",
    taxonomy: "esrs_EducationalQuality",
    priority: { min: 70, max: 100 }
  },
  {
    name: "Inclusión y Diversidad",
    category: "Social",
    esrs: "S2",
    ods: "10",
    kpi: "Índice de inclusión educativa (%)",
    taxonomy: "esrs_Inclusion",
    priority: { min: 60, max: 100 }
  },
  {
    name: "Bienestar Estudiantil",
    category: "Social",
    esrs: "S3",
    ods: "3",
    kpi: "Satisfacción estudiantil (%)",
    taxonomy: "esrs_StudentWellbeing",
    priority: { min: 60, max: 100 }
  },
  {
    name: "Desarrollo Profesional",
    category: "Social",
    esrs: "S4",
    ods: "8",
    kpi: "Horas de formación por docente",
    taxonomy: "esrs_ProfessionalDevelopment",
    priority: { min: 50, max: 90 }
  },
  {
    name: "Innovación Educativa",
    category: "Social",
    esrs: "S5",
    ods: "9",
    kpi: "Proyectos de innovación pedagógica",
    taxonomy: "esrs_EducationalInnovation",
    priority: { min: 50, max: 90 }
  },
  // Governance Topics
  {
    name: "Transparencia Académica",
    category: "Governance",
    esrs: "G1",
    ods: "16",
    kpi: "Índice de transparencia institucional (%)",
    taxonomy: "esrs_AcademicTransparency",
    priority: { min: 70, max: 100 }
  },
  {
    name: "Gestión Institucional",
    category: "Governance",
    esrs: "G2",
    ods: "16",
    kpi: "Eficiencia en procesos académicos (%)",
    taxonomy: "esrs_InstitutionalManagement",
    priority: { min: 60, max: 90 }
  },
  {
    name: "Participación Comunitaria",
    category: "Governance",
    esrs: "G3",
    ods: "17",
    kpi: "Participación en proyectos comunitarios (%)",
    taxonomy: "esrs_CommunityEngagement",
    priority: { min: 50, max: 90 }
  }
];

// Define interfaces for better type safety and documentation
const ESGCategories = {
  ENVIRONMENTAL: 'Environmental',
  SOCIAL: 'Social',
  GOVERNANCE: 'Governance'
};

const CategoryColors = {
  [ESGCategories.ENVIRONMENTAL]: '#66cdaa',
  [ESGCategories.SOCIAL]: '#ffa07a',
  [ESGCategories.GOVERNANCE]: '#87ceeb'
};

// State management using a singleton pattern
class ESGState {
  static instance = null;
  
  constructor() {
    if (ESGState.instance) {
      return ESGState.instance;
    }
    
    this.state = {
      selectedTopic: null,
      chart: null,
      results: new Map(), // Using Map instead of array for O(1) lookups
      topics: new Map(esgTopics.map(topic => [topic.name, topic])) // Cache topics for faster lookup
    };
    
    ESGState.instance = this;
  }
  
  static getInstance() {
    if (!ESGState.instance) {
      ESGState.instance = new ESGState();
    }
    return ESGState.instance;
  }
  
  getState() {
    return this.state;
  }
  
  updateState(newState) {
    this.state = { ...this.state, ...newState };
    return this.state;
  }
}

class MaterialityMatrix {
  constructor() {
    this.state = ESGState.getInstance();
    this.initializeEventListeners();
    this.populateTopics();
    this.initializeEmptyTable();
    this.initializeEmptyChart();
    this.toggleControls(false); // Disable controls initially
  }

  initializeEventListeners() {
    const elements = {
      topicSelect: document.getElementById('topicSelect'),
      score: document.getElementById('score'),
      scoreNumber: document.getElementById('scoreNumber'),
      stakeholder: document.getElementById('stakeholder'),
      stakeholderNumber: document.getElementById('stakeholderNumber'),
      downloadBtn: document.getElementById('downloadBtn'),
      exportChartBtn: document.getElementById('exportChartBtn')
    };

    elements.topicSelect?.addEventListener('change', () => this.selectTopic());
    
    // Score input listeners
    elements.score?.addEventListener('input', (e) => {
      // Update only the number input while sliding
      elements.scoreNumber.value = e.target.value;
    });
    
    elements.score?.addEventListener('change', (e) => {
      // Update everything when sliding stops
      elements.scoreNumber.value = e.target.value;
      this.updateValues();
    });
    
    elements.scoreNumber?.addEventListener('change', (e) => {
      let value = Math.min(100, Math.max(0, e.target.value));
      elements.score.value = value;
      elements.scoreNumber.value = value;
      this.updateValues();
    });

    // Stakeholder input listeners
    elements.stakeholder?.addEventListener('input', (e) => {
      // Update only the number input while sliding
      elements.stakeholderNumber.value = e.target.value;
    });
    
    elements.stakeholder?.addEventListener('change', (e) => {
      // Update everything when sliding stops
      elements.stakeholderNumber.value = e.target.value;
      this.updateValues();
    });
    
    elements.stakeholderNumber?.addEventListener('change', (e) => {
      let value = Math.min(100, Math.max(0, e.target.value));
      elements.stakeholder.value = value;
      elements.stakeholderNumber.value = value;
      this.updateValues();
    });

    elements.downloadBtn?.addEventListener('click', () => this.downloadData());
    elements.exportChartBtn?.addEventListener('click', () => this.exportChart());
  }

  getCategoryColor(category) {
    return CategoryColors[category] || '#ccc';
  }

  populateTopics() {
    const topicSelect = document.getElementById('topicSelect');
    if (!topicSelect) return;

    const { topics } = this.state.getState();
    
    // Create category groups
    const categories = {
        'Environmental': document.createElement('optgroup'),
        'Social': document.createElement('optgroup'),
        'Governance': document.createElement('optgroup')
    };
    
    // Set labels
    categories.Environmental.label = 'Ambiental';
    categories.Social.label = 'Social';
    categories.Governance.label = 'Gobernanza';

    // Add placeholder option
    const placeholder = document.createElement('option');
    placeholder.value = '';
    placeholder.textContent = 'Seleccione un tema';
    topicSelect.appendChild(placeholder);

    // Group topics by category
    topics.forEach(topic => {
        const option = document.createElement('option');
        option.value = topic.name;
        option.textContent = topic.name;
        categories[topic.category].appendChild(option);
    });

    // Add groups to select
    Object.values(categories).forEach(group => {
        topicSelect.appendChild(group);
    });
  }

  selectTopic() {
    const topicName = document.getElementById('topicSelect')?.value;
    const { topics, results } = this.state.getState();
    
    // Enable/disable controls based on selection
    this.toggleControls(!!topicName);
    
    if (!topicName) {
      this.state.updateState({ selectedTopic: null });
      return;
    }

    const selectedTopic = topics.get(topicName);
    
    // Update sliders and inputs with saved values or reset to 0
    const savedValues = results.get(topicName) || { score: 0, stakeholders: 0 };
    
    const elements = {
      score: document.getElementById('score'),
      scoreNumber: document.getElementById('scoreNumber'),
      stakeholder: document.getElementById('stakeholder'),
      stakeholderNumber: document.getElementById('stakeholderNumber')
    };

    // Update score inputs
    if (elements.score) elements.score.value = savedValues.score;
    if (elements.scoreNumber) elements.scoreNumber.value = savedValues.score;

    // Update stakeholder inputs
    if (elements.stakeholder) elements.stakeholder.value = savedValues.stakeholders;
    if (elements.stakeholderNumber) elements.stakeholderNumber.value = savedValues.stakeholders;
    
    this.state.updateState({ selectedTopic });
  }

  updateValues() {
    const { selectedTopic } = this.state.getState();
    if (!selectedTopic) {
      alert('Selecciona un tema ESG.');
      return;
    }

    const values = {
      score: parseInt(document.getElementById('score')?.value) || 0,
      stakeholders: parseInt(document.getElementById('stakeholder')?.value) || 0
    };

    this.updateDisplayValues(values);
    this.updateResults(values);
    this.updateChart();
    this.updateTable();
  }

  updateDisplayValues({ score, stakeholders }) {
    const elements = {
      score: document.getElementById('scoreNumber'),
      stakeholder: document.getElementById('stakeholderNumber')
    };

    if (elements.score) elements.score.value = score;
    if (elements.stakeholder) elements.stakeholder.value = stakeholders;
  }

  updateResults({ score, stakeholders }) {
    const { selectedTopic, results } = this.state.getState();
    
    // Calculate adjusted score based on priority range
    const adjustedScore = this.calculateAdjustedValue(score, selectedTopic.priority);
    const adjustedStakeholders = this.calculateAdjustedValue(stakeholders, selectedTopic.priority);
    
    const materialidad = (adjustedScore * 0.65 + adjustedStakeholders * 0.35).toFixed(2);
    
    results.set(selectedTopic.name, {
      ...selectedTopic,
      score: adjustedScore,
      stakeholders: adjustedStakeholders,
      materialidad: parseFloat(materialidad),
      rawScore: score, // Keep original values for reference
      rawStakeholders: stakeholders
    });

    this.state.updateState({ results });
  }

  calculateAdjustedValue(value, priority) {
    const { min, max } = priority;
    // Scale the input value (0-100) to the priority range
    return Math.round(min + (value * (max - min) / 100));
  }

  updateChart() {
    const ctx = document.getElementById('matrixChart')?.getContext('2d');
    if (!ctx) return;

    const { chart, results } = this.state.getState();
    if (chart) chart.destroy();

    if (!Chart.registry.plugins.get('quadrants')) {
        Chart.register({
            id: 'quadrants',
            beforeDraw: (chart) => chart.config.options.plugins.quadrants.beforeDraw(chart)
        });
    }

    const validResults = Array.from(results.values()).filter(r => 
        !(r.rawScore === 0 && r.rawStakeholders === 0)
    );

    const config = this.getBaseChartConfig();
    config.plugins.tooltip = {
        enabled: false,
        external: function(context) {
            // Get or create tooltip element
            let tooltipEl = document.getElementById('chartjs-tooltip');
            
            if (!tooltipEl) {
                tooltipEl = document.createElement('div');
                tooltipEl.id = 'chartjs-tooltip';
                tooltipEl.style.background = 'rgba(0, 0, 0, 0.7)';
                tooltipEl.style.borderRadius = '3px';
                tooltipEl.style.color = 'white';
                tooltipEl.style.opacity = 0;
                tooltipEl.style.pointerEvents = 'none';
                tooltipEl.style.position = 'absolute';
                tooltipEl.style.transition = 'all .1s ease';
                tooltipEl.style.padding = '10px';
                document.body.appendChild(tooltipEl);
            }

            // Hide if no tooltip
            if (!context.tooltip || context.tooltip.opacity === 0) {
                tooltipEl.style.opacity = 0;
                return;
            }

            // Set Text
            if (context.tooltip.body) {
                const bodyLines = context.tooltip.body.map(b => b.lines);
                tooltipEl.innerHTML = bodyLines[0].join('<br>');
            }

            const position = context.chart.canvas.getBoundingClientRect();
            const radius = context.tooltip.dataPoints[0].raw.r;

            // Position and show tooltip
            tooltipEl.style.opacity = 1;
            tooltipEl.style.left = position.left + window.pageXOffset + context.tooltip.caretX + (radius * 1.2) + 'px';
            tooltipEl.style.top = position.top + window.pageYOffset + context.tooltip.caretY + 'px';
            tooltipEl.style.font = context.tooltip.options.bodyFont.string;
            tooltipEl.style.transform = 'translate(0, -50%)';
        },
        callbacks: {
            label: function(context) {
                const point = context.raw;
                const result = context.dataset.raw;
                return [
                    `ESG: ${context.dataset.label}`,
                    `Materialidad: ${point.y}%`,
                    `Puntuación Screening: ${point.x}% (original: ${result.rawScore}%)`,
                    `Stakeholders: ${point.r * 2}% (original: ${result.rawStakeholders}%)`
                ];
            },
            title: function() {
                return '';
            }
        },
        padding: 12,
        displayColors: false
    };

    const newChart = new Chart(ctx, {
        type: 'bubble',
        data: {
            datasets: validResults.map(r => ({
                label: r.name,
                data: [{
                    x: r.score,
                    y: r.materialidad,
                    r: (r.stakeholders || r.score) / 2
                }],
                backgroundColor: this.getCategoryColor(r.category),
                borderColor: '#000',
                borderWidth: 1,
                raw: r
            }))
        },
        options: config
    });

    this.state.updateState({ chart: newChart });
  }

  initializeEmptyTable() {
    const table = document.getElementById('resultsTable');
    if (!table) return;

    table.innerHTML = `
      <tr class="empty-row">
        <td colspan="8" class="no-data">
          No hay datos. Seleccione un tema y ajuste los valores para comenzar.
        </td>
      </tr>
    `;
  }

  updateTable() {
    const table = document.getElementById('resultsTable');
    if (!table) return;

    const { results } = this.state.getState();
    
    // Filter out entries where both score and stakeholders are 0
    const validResults = Array.from(results.values()).filter(r => 
        !(r.rawScore === 0 && r.rawStakeholders === 0)
    );
    
    if (validResults.length === 0) {
        this.initializeEmptyTable();
        return;
    }

    table.innerHTML = validResults
        .map(r => `
            <tr>
                <td>${r.name}</td>
                <td>${r.category}</td>
                <td>${r.esrs}</td>
                <td>${r.ods}</td>
                <td>${r.kpi}</td>
                <td>${r.score}%</td>
                <td>${r.stakeholders}%</td>
                <td>${r.materialidad}%</td>
            </tr>
        `).join('');
  }

  downloadData() {
    const { results } = this.state.getState();
    const headers = 'Tema,Categoría,ESRS,ODS,KPI,Puntuación Screening,Stakeholders,Materialidad';
    
    const csvContent = [
      headers,
      ...Array.from(results.values()).map(r => 
        `${r.name},${r.category},${r.esrs},${r.ods},${r.kpi},${r.score},${r.stakeholders},${r.materialidad}`
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'datos_materialidad_esg.csv';
    link.click();
  }

  initializeEmptyChart() {
    const ctx = document.getElementById('matrixChart')?.getContext('2d');
    if (!ctx) return;

    if (!Chart.registry.plugins.get('quadrants')) {
        Chart.register({
            id: 'quadrants',
            beforeDraw: (chart) => chart.config.options.plugins.quadrants.beforeDraw(chart)
        });
    }

    const newChart = new Chart(ctx, {
        type: 'bubble',
        data: {
            datasets: []
        },
        options: this.getBaseChartConfig()
    });

    this.state.updateState({ chart: newChart });
  }

  exportChart() {
    const { results } = this.state.getState();
    const validResults = Array.from(results.values()).filter(r => 
        !(r.rawScore === 0 && r.rawStakeholders === 0)
    );

    const htmlTemplate = `
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Matriz de Materialidad ESG - Gráfico Interactivo</title>
            <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
            <style>
                :root {
                    --primary: #0f766e;
                    --primary-light: #14b8a6;
                    --bg-color: #f8fafc;
                    --text-color: #1e293b;
                    --border-color: #e2e8f0;
                    --shadow: 0 2px 4px rgba(0,0,0,0.1);
                }
                body {
                    font-family: system-ui, -apple-system, sans-serif;
                    margin: 0;
                    padding: 2rem;
                    background-color: var(--bg-color);
                    min-height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .container {
                    width: 100%;
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 1rem;
                }
                .chart-section {
                    background: white;
                    padding: 1rem;
                    border-radius: 8px;
                    box-shadow: var(--shadow);
                    width: 100%;
                }
                .chart-container {
                    position: relative;
                    width: 100%;
                    padding-bottom: 83.33%; /* This maintains 1.2 aspect ratio (100/1.2) */
                    height: 0;
                }
                .chart-container canvas {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100% !important;
                    height: 100% !important;
                }
                .legend {
                    display: flex;
                    justify-content: center;
                    gap: 2rem;
                    margin-top: 0.5rem;
                    padding: 0.5rem 0;
                    font-family: system-ui, -apple-system, sans-serif;
                    color: var(--text-color);
                    font-size: 14px;
                }
                .legend-item {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }
                .legend-color {
                    width: 12px;
                    height: 12px;
                    border-radius: 50%;
                }
                .environmental { background-color: #66cdaa; }
                .social { background-color: #ffa07a; }
                .governance { background-color: #87ceeb; }
                #chartjs-tooltip {
                    background: rgba(0, 0, 0, 0.7);
                    border-radius: 3px;
                    color: white;
                    opacity: 0;
                    pointer-events: none;
                    position: absolute;
                    white-space: nowrap;
                    z-index: 1000;
                    line-height: 1.5;
                    font-size: 14px;
                    padding: 10px;
                    font-family: system-ui, -apple-system, sans-serif;
                }
                .section-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 0.5rem;
                }
                .section-header h2 {
                    margin: 0;
                    color: var(--text-color);
                    font-size: 1.25rem;
                    font-weight: 700;
                    font-family: system-ui, -apple-system, sans-serif;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="chart-section">
                    <div class="section-header">
                        <h2>Matriz de Materialidad</h2>
                    </div>
                    <div class="chart-container">
                        <canvas id="exportedChart"></canvas>
                    </div>
                    <div class="legend">
                        <div class="legend-item">
                            <span class="legend-color environmental"></span>
                            <span>Ambiental</span>
                        </div>
                        <div class="legend-item">
                            <span class="legend-color social"></span>
                            <span>Social</span>
                        </div>
                        <div class="legend-item">
                            <span class="legend-color governance"></span>
                            <span>Gobernanza</span>
                        </div>
                    </div>
                </div>
            </div>
            <script>
                const CategoryColors = {
                    'Environmental': '#66cdaa',
                    'Social': '#ffa07a',
                    'Governance': '#87ceeb'
                };

                function getCategoryColor(category) {
                    return CategoryColors[category] || '#ccc';
                }

                const quadrantConfig = {
                    beforeDraw(chart) {
                        const {ctx, chartArea: {left, top, right, bottom}} = chart;
                        const midX = left + (right - left) / 2;
                        const midY = top + (bottom - top) / 2;
                        
                        ctx.fillStyle = 'rgba(135, 206, 235, 0.4)';
                        ctx.fillRect(midX, top, right - midX, midY - top);
                        
                        ctx.fillStyle = 'rgba(135, 206, 235, 0.3)';
                        ctx.fillRect(left, top, midX - left, midY - top);
                        
                        ctx.fillStyle = 'rgba(135, 206, 235, 0.2)';
                        ctx.fillRect(midX, midY, right - midX, bottom - midY);
                        
                        ctx.fillStyle = 'rgba(135, 206, 235, 0.1)';
                        ctx.fillRect(left, midY, midX - left, bottom - midY);
                        
                        ctx.font = '14px system-ui';
                        ctx.textAlign = 'center';
                        ctx.fillStyle = '#64748b';
                        
                        ctx.fillText('Media Baja', left + (midX - left) / 2, bottom + 35);
                        ctx.fillText('Baja', midX + (right - midX) / 2, bottom + 35);
                        ctx.fillText('Alta', left + (midX - left) / 2, top - 15);
                        ctx.fillText('Media Alta', midX + (right - midX) / 2, top - 15);
                        
                        ctx.font = '12px system-ui';
                        ctx.fillStyle = '#475569';
                        
                        const quarterX = (midX - left) / 2;
                        const quarterY = (midY - top) / 2;
                        const verticalOffset = 5;
                        
                        ctx.fillText('MEDIA ALTA', left + quarterX, top + quarterY + verticalOffset);
                        ctx.fillText('ALTA', midX + quarterX, top + quarterY + verticalOffset);
                        ctx.fillText('BAJA', left + quarterX, midY + quarterY + verticalOffset);
                        ctx.fillText('MEDIA BAJA', midX + quarterX, midY + quarterY + verticalOffset);
                        
                        ctx.beginPath();
                        ctx.strokeStyle = '#94a3b8';
                        ctx.lineWidth = 2;
                        ctx.moveTo(midX, top);
                        ctx.lineTo(midX, bottom);
                        ctx.moveTo(left, midY);
                        ctx.lineTo(right, midY);
                        ctx.stroke();
                    }
                };

                Chart.register({
                    id: 'quadrants',
                    beforeDraw: (chart) => quadrantConfig.beforeDraw(chart)
                });

                new Chart('exportedChart', {
                    type: 'bubble',
                    data: {
                        datasets: ${JSON.stringify(validResults.map(r => ({
                            label: r.name,
                            data: [{
                                x: r.score,
                                y: r.materialidad,
                                r: (r.stakeholders || r.score) / 2
                            }],
                            backgroundColor: this.getCategoryColor(r.category),
                            borderColor: '#000',
                            borderWidth: 1,
                            raw: r
                        })))}
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: true,
                        aspectRatio: 1.2,  // Match with the container's padding-bottom
                        layout: {
                            padding: {
                                top: 30,
                                right: 30,
                                bottom: 50,
                                left: 30
                            }
                        },
                        scales: {
                            x: {
                                title: { 
                                    display: true, 
                                    text: 'Puntuación Screening (%)',
                                    font: { size: 12 },
                                    padding: 10
                                },
                                min: 0,
                                max: 100,
                                grid: {
                                    display: true,
                                    color: (context) => context.tick.value === 50 ? '#475569' : '#94a3b8',
                                    lineWidth: (context) => context.tick.value === 50 ? 2 : 1
                                },
                                ticks: { stepSize: 10 }
                            },
                            y: {
                                title: { 
                                    display: true, 
                                    text: 'Materialidad (%)',
                                    font: { size: 12 },
                                    padding: 10
                                },
                                min: 0,
                                max: 100,
                                grid: {
                                    display: true,
                                    color: (context) => context.tick.value === 50 ? '#475569' : '#94a3b8',
                                    lineWidth: (context) => context.tick.value === 50 ? 2 : 1
                                },
                                ticks: { stepSize: 10 }
                            }
                        },
                        plugins: {
                            legend: {
                                display: false
                            },
                            quadrants: quadrantConfig,
                            tooltip: {
                                enabled: false,
                                external: function(context) {
                                    let tooltipEl = document.getElementById('chartjs-tooltip');
                                    
                                    if (!tooltipEl) {
                                        tooltipEl = document.createElement('div');
                                        tooltipEl.id = 'chartjs-tooltip';
                                        document.body.appendChild(tooltipEl);
                                    }

                                    if (!context.tooltip || context.tooltip.opacity === 0) {
                                        tooltipEl.style.opacity = 0;
                                        return;
                                    }

                                    if (context.tooltip.body) {
                                        const bodyLines = context.tooltip.body.map(b => b.lines);
                                        tooltipEl.innerHTML = bodyLines[0].join('<br>');
                                    }

                                    const position = context.chart.canvas.getBoundingClientRect();
                                    const radius = context.tooltip.dataPoints[0].raw.r;

                                    tooltipEl.style.opacity = 1;
                                    tooltipEl.style.left = position.left + window.pageXOffset + context.tooltip.caretX + (radius * 1.2) + 'px';
                                    tooltipEl.style.top = position.top + window.pageYOffset + context.tooltip.caretY + 'px';
                                    tooltipEl.style.transform = 'translate(0, -50%)';
                                },
                                callbacks: {
                                    label: function(context) {
                                        const point = context.raw;
                                        const result = context.dataset.raw;
                                        return [
                                            \`ESG: \${context.dataset.label}\`,
                                            \`Materialidad: \${point.y}%\`,
                                            \`Puntuación Screening: \${point.x}% (original: \${result.rawScore}%)\`,
                                            \`Stakeholders: \${point.r * 2}% (original: \${result.rawStakeholders}%)\`
                                        ];
                                    }
                                }
                            }
                        }
                    }
                });
            </script>
        </body>
        </html>`;

    const blob = new Blob([htmlTemplate], { type: 'text/html;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'matriz_materialidad_esg.html';
    link.click();
  }

  toggleControls(enabled) {
    const controls = [
      document.getElementById('score'),
      document.getElementById('scoreNumber'),
      document.getElementById('stakeholder'),
      document.getElementById('stakeholderNumber')
    ];

    controls.forEach(control => {
      if (control) {
        control.disabled = !enabled;
        control.style.opacity = enabled ? '1' : '0.5';
      }
    });
  }

  getQuadrantConfig() {
    return {
        beforeDraw(chart) {
            const {ctx, chartArea: {left, top, right, bottom}, scales: {x, y}} = chart;
            const midX = left + (right - left) / 2;
            const midY = top + (bottom - top) / 2;
            
            // Draw background colors for each quadrant
            ctx.fillStyle = 'rgba(135, 206, 235, 0.4)'; // Dark light blue for Alta
            ctx.fillRect(midX, top, right - midX, midY - top); // Top right
            
            ctx.fillStyle = 'rgba(135, 206, 235, 0.3)'; // Medium light blue for Media Alta  
            ctx.fillRect(left, top, midX - left, midY - top); // Top left
            
            ctx.fillStyle = 'rgba(135, 206, 235, 0.2)'; // Light blue for Media Baja
            ctx.fillRect(midX, midY, right - midX, bottom - midY); // Bottom right
            
            ctx.fillStyle = 'rgba(135, 206, 235, 0.1)'; // Very light blue for Baja
            ctx.fillRect(left, midY, midX - left, bottom - midY); // Bottom left
            
            // Set text properties for border labels
            ctx.font = '14px system-ui';
            ctx.textAlign = 'center';
            ctx.fillStyle = '#64748b';
            
            // Draw quadrant labels at borders
            ctx.fillText('Media Baja', left + (midX - left) / 2, bottom + 35);
            ctx.fillText('Baja', midX + (right - midX) / 2, bottom + 35);
            ctx.fillText('Alta', left + (midX - left) / 2, top - 15);
            ctx.fillText('Media Alta', midX + (right - midX) / 2, top - 15);
            
            // Draw quadrant labels in center of each quadrant
            ctx.font = '12px system-ui';
            ctx.fillStyle = '#475569';
            
            // Calculate center points for each quadrant
            const quarterX = (midX - left) / 2;
            const quarterY = (midY - top) / 2;
            const verticalOffset = 5;
            
            // Draw centered labels
            ctx.fillText('MEDIA ALTA', left + quarterX, top + quarterY + verticalOffset);
            ctx.fillText('ALTA', midX + quarterX, top + quarterY + verticalOffset);
            ctx.fillText('BAJA', left + quarterX, midY + quarterY + verticalOffset);
            ctx.fillText('MEDIA BAJA', midX + quarterX, midY + quarterY + verticalOffset);
            
            // Draw grid lines
            ctx.beginPath();
            ctx.strokeStyle = '#94a3b8';
            ctx.lineWidth = 2;
            ctx.moveTo(midX, top);
            ctx.lineTo(midX, bottom);
            ctx.moveTo(left, midY);
            ctx.lineTo(right, midY);
            ctx.stroke();
        }
    };
  }

  getBaseChartConfig() {
    return {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 1.2,  // Keep consistent with export
        layout: {
            padding: {
                top: 30,
                right: 30,
                bottom: 50,
                left: 30
            }
        },
        scales: {
            x: {
                title: { 
                    display: true, 
                    text: 'Puntuación Screening (%)',
                    font: { size: 12 },
                    padding: 10
                },
                min: 0,
                max: 100,
                grid: {
                    display: true,
                    color: (context) => context.tick.value === 50 ? '#475569' : '#94a3b8',
                    lineWidth: (context) => context.tick.value === 50 ? 2 : 1
                },
                ticks: {
                    stepSize: 10
                }
            },
            y: {
                title: { 
                    display: true, 
                    text: 'Materialidad (%)',
                    font: { size: 12 },
                    padding: 10
                },
                min: 0,
                max: 100,
                grid: {
                    display: true,
                    color: (context) => context.tick.value === 50 ? '#475569' : '#94a3b8',
                    lineWidth: (context) => context.tick.value === 50 ? 2 : 1
                },
                ticks: {
                    stepSize: 10
                }
            }
        },
        plugins: {
            legend: {
                display: false
            },
            quadrants: this.getQuadrantConfig()
        }
    };
  }
}

// Initialize the application when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new MaterialityMatrix();
}); 