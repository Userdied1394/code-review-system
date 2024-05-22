import subprocess

def run_sonarqube_analysis(code):
    with open('temp_code.py', 'w') as file:
        file.write(code)
    
    result = subprocess.run(
        ['sonar-scanner', '-Dsonar.projectBaseDir=.', '-Dsonar.sources=temp_code.py'],
        capture_output=True,
        text=True
    )
    return result.stdout

if __name__ == "__main__":
    code = """
def example_function():
    print("Hello, World!")
"""
    print(run_sonarqube_analysis(code))
