print("VEX IQ Score Calculator\n\n")

while True:
    cubes = int(input("How many cubes: "))

    red = int(input("How many red knocked: "))

    uniform = int(input("How many uniform: "))

    l = int(input("Lowest level: "))

    parked = int(input("How many partially parked: "))

    print("")
    p = cubes + (red*5) + (uniform*10) + (l*10) + (parked*5)
    print(str(p) + " points")

    
    print("\n\n\n\n\n")
    
