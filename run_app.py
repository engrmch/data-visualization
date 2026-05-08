import subprocess

# Paths to your projects
backend_dir = r"C:\Users\mich\Desktop\WEBDEV-Projects\data-visualization\backend"
frontend_dir = r"C:\Users\mich\Desktop\WEBDEV-Projects\data-visualization\frontend"

def run_backend():
    # Open a new cmd window and run uvicorn
    subprocess.Popen(
        f'start cmd /k "cd /d "{backend_dir}" && python -m uvicorn main:app --reload"',
        shell=True
    )

def run_frontend():
    # Open a new cmd window and run npm start
    subprocess.Popen(
        f'start cmd /k "cd /d "{frontend_dir}" && npm run dev"',
        shell=True
    )

if __name__ == "__main__":
    run_backend()
    run_frontend()
    print("Backend and frontend launched in separate CMD windows.")
