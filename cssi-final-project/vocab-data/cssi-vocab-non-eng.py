import sys

short = {}
medium = {}
long = {}

def main():
    with open("russian-vocab.txt", 'r') as f:
        for line in f:
            line = line[1:]
            firstTab = line.find('\t')
            secondTab = line.find('\t', firstTab+1)
            key = line[firstTab+1:secondTab].strip()
            value = line[secondTab+1:].strip()
            if len(key) >= 9:
                long[key] = value
            elif len(key) >= 6:
                medium[key] = value
            elif len(key) >= 3:
                short[key] = value

if __name__ == "__main__":
    main()
    print(long)
