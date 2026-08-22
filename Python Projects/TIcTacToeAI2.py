




def printBoard(board):
    
    print(str(board[0]) + " | " + str(board[1]) + " | " + str(board[2]))
    print("--+---+--")
    print(str(board[3]) + " | " + str(board[4]) + " | " + str(board[5]))
    print("--+---+--")
    print(str(board[6]) + " | " + str(board[7]) + " | " + str(board[8]))



def spaceFree(board, position):
    if board[position] == " ":
        return True
    else:
        return False

def checkDraw(board):
    
    filledSpaces = 0
    
    for i in range(len(board)):
        if board[i] != " ":
            filledSpaces += 1
    if filledSpaces == len(board):
        return True
    else:
        return False
    
def checkWin(board):
    
    if check3Equal(board[0],board[1],board[2]):
        return True
    if check3Equal(board[4],board[5],board[3]):
        return True
    if check3Equal(board[6],board[7],board[8]):
        return True
    if check3Equal(board[0],board[3],board[6]):
        return True
    if check3Equal(board[1],board[4],board[7]):
        return True
    if check3Equal(board[2],board[5],board[8]):
        return True
    if check3Equal(board[0],board[4],board[8]):
        return True
    if check3Equal(board[2],board[4],board[6]):
        return True
    
    return False

def check3Equal(a,b,c):
    if a == b == c and a != " ":
        return True

    return False

def checkMarkWon(board, mark):
    
    if board[0] == board[1] == board[2] and board[0] == mark:
        return True
        
    if board[3] == board[4] == board[5] and board[3] == mark:
        return True
    
    if board[6] == board[7] == board[8] and board[6] == mark:
        return True
    
    if board[0] == board[3] == board[6] and board[0] == mark:
        return True
    
    if board[1] == board[4] == board[7] and board[1] == mark:
        return True
    
    if board[2] == board[5] == board[8] and board[2] == mark:
        return True
    
    if board[0] == board[4] == board[8] and board[0] == mark:
        return True

    if board[2] == board[4] == board[6] and board[2] == mark:
        return True
    
    return False

def insertLetter(board, letter, position):
    if spaceFree(board,position):
        board[position] = letter
        
        if checkDraw(board):
            print("Draw")
            return

        if checkWin(board):
            if letter == bot:
                print("Bot wins")
            else:
                print("Player wins")

    else:
        print("Cant move there")
        position = int(input("Enter new position: "))
        insertLetter(letter, position)
        
        return
    



def compMove(board):
    bestScore = -10000
    bestMove = 0

    for i in range(len(board)):
        if board[i] == " ":
            board[i] = bot
            score = minimax(board,False)
            board[i] = " "
            if score > bestScore:
                bestScore = score
                bestMove = i

    insertLetter(board, bot, bestMove)
    return



def minimax(board,isMaximising):
    if checkMarkWon(board, bot):
        return 1
    
    elif checkMarkWon(board, player):
        return -1

    elif checkDraw(board):
        return 0

    if isMaximising:
        bestScore = -1000
        for i in range(len(board)):
            if board[i] == " ":
                board[i] = player
                score = minimax(board,True)
                board[i] = " "
            
                if score < bestScore:
                    bestScore = score
               
        return bestScore

    else:
        bestScore = 1000
        for i in range(len(board)):
            
            if board[i] == " ":
                board[i] = player
                score = minimax(board,True)
                board[i] = " "
            
                if score < bestScore:
                    bestScore = score
               
        return bestScore
        
                    



board = [" "," "," "," "," "," "," "," "," "]
bot = "X"
player = "O"
while True:
    compMove(board)
    printBoard(board)
    print("")
    print("")
    space = int(input("Where do you want to move to: "))
    insertLetter(board, player, space)
    print("")
    print("")
    printBoard(board)
    print("")
    print("")
    

                
    
