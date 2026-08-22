from PIL import Image
import math
import random

im = Image.new(mode = "RGB", size = (500,300), color = (0,0,0))



pixels = im.load()

width = im.size[0]
height = im.size[1]

maxRayDepth = 10000
startEmmisive = 0

aspectRatio = width/height

class HitInfo:
    def __init__(self):
        self.distance = maxRayDepth
        self.normal = (0,0,0)
        self.emissive = (startEmmisive,startEmmisive,startEmmisive)
        self.albedo = (0,0,0)
        self.position = (0,0,0)


def randomUnitVector():
    z = random.uniform(0,1) * 2 - 1
    a = random.uniform(0,1) * math.pi*2
    r = math.sqrt(1 - z*z)
    x = r * math.cos(a)
    y = r * math.sin(a)

    return (x,y,z)

def lerp(a,b,t):
    return a + (b-a) * t

def lerpTupleByValue(a,b,t):
    return (lerp(a[0], b[0], t),lerp(a[1], b[1], t),lerp(a[2], b[2], t))

def tupleDot(x,y):
    return (x[0] * y[0] + x[1] * y[1] + x[2] * y[2])

def normalize(x):
    mag = math.sqrt(pow(x[0],2)+pow(x[1],2)+pow(x[2],2))
    return (x[0] / mag, x[1] / mag, x[2] / mag)

def minusTuple(x, y):
    return (x[0] -y[0], x[1] - y[1], x[2] - y[2])

def minusTupleByValue(x, y):
    return (x[0] -y, x[1] - y, x[2] - y)

def addTuple(x, y):
    return (x[0] +y[0], x[1] + y[1], x[2] + y[2])

def multiplyTupleByValue(x, t):
    return (x[0] * t, x[1] * t, x[2] * t)

def tupleToInt(t):
    return ((int)(t[0]),(int)(t[1]),(int)(t[2]))

def multiplyTuple(x,y):
    return (x[0]*y[0],x[1]*y[1],x[2]*y[2])


def divideTupleByValue(x, t):
    return (x[0] / t, x[1] / t, x[2] / t)


def IntersectSphere(rayPos, rayDir, spherePos, radius):
    hitInfo = HitInfo()
    
    offsetRayOrigin = minusTuple(rayPos, spherePos)

    a = tupleDot(rayDir, rayDir)
    b = 2 * tupleDot(offsetRayOrigin, rayDir)
    c = tupleDot(offsetRayOrigin, offsetRayOrigin) - radius*radius

    d = b*b - 4 * a * c

    if d >= 0:
        dst = (-b - math.sqrt(d)) / (2 * a)

        if d >= 0:
            hitInfo.distance = dst
            hitInfo.position = multiplyTupleByValue(addTuple(rayPos, rayDir), dst)
            hitInfo.normal = normalize(minusTuple(hitInfo.position, spherePos))

    return hitInfo
   
def trace(rayDir):
    hitInfo = HitInfo()

    dir = rayDir
    pos = (0,0,0)
    colour = (0.1,0.1,0.1)
    for i in range(2):
        hitInfo.distance = maxRayDepth
        h = HitInfo()
        h = IntersectSphere(pos, dir, (-0.5,0,20), 1)
        if h.distance < hitInfo.distance:
            hitInfo = h
            hitInfo.albedo = (1,0.1,0.1)
            

        h = IntersectSphere(pos, dir, (0.5,0,20), 1)
        if h.distance < hitInfo.distance:
            hitInfo = h
            hitInfo.albedo = (0.1,1,0.1)
            

        colour = hitInfo.albedo
        if hitInfo.distance != maxRayDepth:
            dir = minusTuple(multiplyTuple(multiplyTupleByValue(minusTupleByValue(dir, 2), tupleDot(dir, hitInfo.normal)), hitInfo.normal),dir)
        pos = hitInfo.position
    return colour

for i in range(width):
    for j in range(height):
        #dir = (int((i/width*2-1)*255), int(((j+height/2)/(height+height/2)*2-1)*255),0)
        target = (((i/width)*2-1), ((j/height)*2-1)*-1/aspectRatio, 1)

        dir = normalize(minusTuple(target, (0,0,0)))
        #print(width)
        #print(tupleToInt(multiplyTupleByValue(dir, 255)))
        pixels[i,j] = tupleToInt(multiplyTupleByValue(trace(dir), 255))

                
im.show()


    