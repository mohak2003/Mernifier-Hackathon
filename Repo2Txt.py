import os

codebase_dir = r"C:\Users\mohak\Desktop\copilot-clone-master"

output_file = "merged_code.txt"

code_ext = [".py", ".java", ".c", ".cpp", ".cs", ".js", ".ts"]

code_files = []

for root, dirs, files in os.walk(codebase_dir):
    for file in files:
        if os.path.splitext(file)[1] in code_ext:
            code_files.append(os.path.join(root, file))

with open(output_file, "w") as out:
    for code_file in code_files:
        out.write(code_file + "\n")
        with open(code_file, "r") as code:
            content = code.read()
            out.write(content + "\n")
            out.write("-" * 80 + "\n")

print("The code files have been merged into " + output_file)
