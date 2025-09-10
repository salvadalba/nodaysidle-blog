import pandas as pd
import plotly.graph_objects as go

# Load the data
df = pd.read_csv("ai_scapegoating_data.csv")

# Clean scenario names to fit 15 character limit
scenario_mapping = {
    'Legal Case\nFalse Citations': 'Legal Cases',
    'Student Cheating\nDetection Issues': 'Student Cheat',
    'Hiring Bias\nAlgorithms': 'Hiring Bias', 
    'Medical AI\nDiagnosis Errors': 'Medical AI',
    'Social Media\nContent Filtering': 'Social Media',
    'Financial Trading\nAlgorithmic Decisions': 'Fin Trading'
}

df['Scenario_Short'] = df['Scenario'].map(scenario_mapping)

# Create horizontal bar chart
fig = go.Figure()

# Add AI Blamed percentage bars
fig.add_trace(go.Bar(
    y=df['Scenario_Short'],
    x=df['AI_Blamed'],
    name='AI Blamed %',
    orientation='h',
    marker_color='#DB4545',  # Bright red
    text=[f"{val}%" for val in df['AI_Blamed']],
    textposition='auto'
))

# Add Actual AI Fault percentage bars
fig.add_trace(go.Bar(
    y=df['Scenario_Short'],
    x=df['Actual_AI_Fault'],
    name='Actual AI Fault %',
    orientation='h',
    marker_color='#1FB8CD',  # Strong cyan
    text=[f"{val}%" for val in df['Actual_AI_Fault']],
    textposition='auto'
))

# Update layout
fig.update_layout(
    title='AI Scapegoating Gap Across Scenarios',
    xaxis_title='Percentage',
    yaxis_title='Scenarios',
    barmode='group',
    legend=dict(orientation='h', yanchor='bottom', y=1.05, xanchor='center', x=0.5)
)

# Update axes
fig.update_xaxes(range=[0, 100])
fig.update_traces(cliponaxis=False)

# Save the chart
fig.write_image("ai_scapegoating_chart.png")