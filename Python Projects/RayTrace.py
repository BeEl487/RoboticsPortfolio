import turtle

wn = turtle.Screen()
wn.setup(800, 600)
wn.bgcolor("black")
#wn.tracer(0)


pen = turtle.Turtle()
pen.speed(0)
pen.shape("square")
pen.color("white")
pen.shapesize(0.001, 0.001, None)
pen.width(1)
penx,_, _ = pen.shapesize()
pen.penup()


#pen.goto(-400,-300)

CX = 10
CY = 10


for x in range(40):
    
    for y in range(40):
        pen.forward(penx*30)
        
        if (x - CX)**2+(y - CY)**2<5**2:
            print("0")
            pen.stamp()
        else:
            print("1")


    pen.setx(0)
    x,y = pen.pos()
    pen.sety(y+penx*30)


