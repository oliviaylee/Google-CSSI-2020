import sys

short = []
medium = []
long = []

def main():
    with open("english-vocab.txt", 'r') as f:
        for line in f:
            line = line.strip()
            if len(line) >= 9:
                long.append(line)
            elif len(line) >= 6:
                medium.append(line)
            elif len(line) >= 3:
                short.append(line)

if __name__ == "__main__":
    main()
    print(long)
