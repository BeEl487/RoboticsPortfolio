import random

def FindAllPossibleMoves(grid, turn):
    possibleMoves = []
    for i in range(len(grid)-2):
        
        if grid[i] == "":
            possibleGrid = grid.copy()
            if turn == "O":
                possibleGrid[i] = "O"
                
            if turn == "X":
                possibleGrid[i] = "X"
            
            finished, winner = GameComplete(possibleGrid)
            
            if finished == True and winner == "O":
                possibleGrid[-2] = "+1"
            if not finished:
                possibleGrid[-2] = "0"
            
            if finished == True and winner == "X":
                possibleGrid[-2] = "-1"
            if not finished:
                possibleGrid[-2] = "0"
            possibleMoves.append(possibleGrid)
            
            if possibleGrid[-1] == "FIRSTMOVE":
                possibleGrid[-1] = str(i)
    if possibleMoves == []:
        possibleMoves = grid
    return possibleMoves


def RemoveCopies(grid):
    newGrid = []
    
    for i in range(len(grid)):
        
        if grid[i] not in newGrid:

            newGrid.append(grid[i])

    return newGrid

def FindAllCompletedGames(games):
    completedGames = []
    for i in range(len(games)):
        finished, winner = GameComplete(games[i])
        tie = IsTie(games[i])
        if finished or tie:
            completedGames.append(games[i].copy())
    return completedGames

def RemoveAllCompletedGames(games):
    notCompletedGames = []
    for i in range(len(games)):
        finished, winner = GameComplete(games[i])
        
        if not finished:
            notCompletedGames.append(games[i].copy())
        
        
        
    return notCompletedGames

def IsTie(grid):
    finished, winner = GameComplete(grid)
    filledSpaces = 0
    if not finished:
        for i in range(len(grid)):
            if grid[i] != "":
                filledSpaces += 1
    if filledSpaces == len(grid):
        return True
    else:
        return False
    
def GameComplete(grid):
    print ( grid)
    if grid[0] == grid[1] == grid[2] and grid[0] != "":
        return True, grid[0]
        
    if grid[3] == grid[4] == grid[5] and grid[3] != "":
        return True, grid[3]
    
    if grid[6] == grid[7] == grid[8] and grid[6] != "":
        return True, grid[6]
    
    if grid[0] == grid[3] == grid[6] and grid[0] != "":
        return True, grid[0]
    
    if grid[1] == grid[4] == grid[7] and grid[1] != "":
        return True, grid[1]
    
    if grid[2] == grid[5] == grid[8] and grid[2] != "":
        return True, grid[2]
    
    if grid[0] == grid[4] == grid[8] and grid[0] != "":
        return True, grid[0]
    
    if grid[2] == grid[4] == grid[6] and grid[2] != "":
        return True, grid[2]
    
    return False, ""

def DisplayBoard(board):
    
    print(str(board[0]) + " | " + str(board[1]) + " | " + str(board[2]))
    print("---------")
    print(str(board[3]) + " | " + str(board[4]) + " | " + str(board[5]))
    print("---------")
    print(str(board[6]) + " | " + str(board[7]) + " | " + str(board[8]))



def MinMax(board, depth):
    turn = "O"
    endResults = []
    newBoards = board.copy()
    for i in range(depth):
        
        boards = newBoards.copy()
        newBoards = []

        if boards == []:
            
            return endResults
        
        for i in range(len(boards)):
            newBoards.extend(FindAllPossibleMoves(boards[i], turn).copy())
            

    
        endResults.extend(FindAllCompletedGames(newBoards).copy())
        newBoards = RemoveAllCompletedGames(newBoards)


        endResults = RemoveCopies(endResults)
        newBoards = RemoveCopies(newBoards)
        
        
        if turn == "O":
            turn = "X"
        else:
            if turn == "X":
                turn = "O"
        
       
        
    return endResults
    

def FindBestMove(boards):
    bestMovesPositions = []
    bestScore = -1000
    for i in range(len(boards)):
        if TransformScore(boards[i][-2]) >= bestScore:
            bestMovesPositions.append(boards[i][-1])
    return RandomChoice(bestMovesPositions)


def RandomChoice(a):
    return a[random.randint(0,len(a)-1)]


def TransformScore(score):
    if score == "+1":
        return 1
    if score == "0":
        return 0
    if score == "-1":
        return -1

def ComputerMove(board, depth):
    newBoard = []
    newBoard.append(board.copy())
    newBoard[0].append("0")
    newBoard[0].append("FIRSTMOVE")
    results = MinMax(newBoard, depth)
    print(results)
    move = FindBestMove(results)
    move = int(move)
    return move

def TryMovePiece(board, position, turn):
    newBoard = board.copy()
    if AllowedMove(board, position) == True:
        newBoard[position] = turn
        return newBoard, True
    return newBoard, False


def AllowedMove(board, position):
    if board[position] == "":
        return True
    else:
        return False
    
gameRunning = True
gameBoard = ["","","","","","","","",""]
moved = False
while gameRunning:
    DisplayBoard(gameBoard)
    print("")
    print("")
    
    moved = False
    while not moved:
        playerMove = input("What space do you want to move into? (1-9) ")
        gameBoard, moved = TryMovePiece(gameBoard, int(playerMove) - 1,"X")
    DisplayBoard(gameBoard)
    print("")
    print("")
    computerMove = ComputerMove(gameBoard, 1)
    gameBoard, computerMoved = TryMovePiece(gameBoard.copy(), computerMove, "O")
    print(gameBoard)

DisplayBoard(["X","X","O","O","O","","","","","0","FIRSTMOVE"])
print(ComputerMove([["X","X","O","O","O","","","","","0","FIRSTMOVE"]],2))








