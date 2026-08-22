import time

#commands = ["O1111","O1110","O1100","O1000","O0000","N","O0001","O0011","O0111","J0000"]

keys = ['O','N',"H", "J"]





def inList(c, l):
    for i in range(len(l)):
        if l[i] == c:
            return True

    return False


def convert():
    c = []
    l = True
    for i in range(len(commands)):
        
        if inList(commands[i], keys):
            
            command = commands[i]
            d = i+1
            if (d < len(commands)-2):
                
                while (not inList(commands[d], keys)) and d < len(commands)-1:
                    if commands[d] != " ":
                        command += commands[d]
                    d+=1

            c.append(command)

    if not inList(c[-1], keys):
        c[-1] += commands[-1]
    return c


           
               
def binaryToDecimal(n):
 
    return str(int(n,2))

def decimalToBinary(num):
     
    if num >= 1:
        DecimalToBinary(num // 2)
    print(num % 2, end = '')


def transform():
    code = ""
    for c in commands:
        if c[0] == "O":
            data = c[1:5]
            code += binaryToDecimal(data+"0001")+","

        elif c[0] == "N":
            code += "0,"

        elif c[0] == "J":
            data = c[1:5]
            code += binaryToDecimal(data+"0010")+","

        elif c[0] == "H":
            code += binaryToDecimal("0100")+","

    code = code[0:-1]
    return code

def d():
    for l in range(len(code)):
        if code[l] == "J":
            n = ""
            g = l+1
            while code[l] != " ":
                n += code[l]

            

while True:
    print("....O: Output            N: No - operation          J: Jump          H: Halt....")
    print("....Spaces seperate lines of code....")
    print("")
    commands = input("Write Code Here:   ")
    commands = convert()
     
    print("")
    print("Transforming...")
    print("")
    print("")
    print(commands) 
    print(transform())
    print("")
    print("")
    print("")
    print("")
    print("")
    print("")
    
       


            
