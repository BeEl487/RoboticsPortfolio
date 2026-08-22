from PIL import Image
import numpy as np
import math
import random

im = Image.new(mode = "RGB", size = (200,150), color = (0,0,0))



pixels = im.load()

width = im.size[0]
height = im.size[1]

aspectRatio = width/height

maxRayDepth=1000

def float2(x,y):
    return np.array([x,y])

def float3(x,y,z):
    return np.array([float(x),float(y),float(z)])

def transform(a):
    return (int(a[0]*255), int(a[1]*255), int(a[2]*255))


 
def RandomUnitVector():

    z = np.random.uniform(0,1) * 2 - 1
    a = np.random.uniform(0,1) * 3.141592653589 * 2
    r = math.sqrt(1 - z * z)
    x = r * math.cos(a)
    y = r * math.sin(a)
    return float3(x, y, z)

class HitInfo:
    def __init__(self):
        self.distance = maxRayDepth
        self.normal = float3(0,0,0)
        self.emissive = float3(0,0,0)
        self.albedo = float3(0,0,0)
        self.position = float3(0,0,0)

        


def normalize(x):
    mag = math.sqrt(pow(x[0],2)+pow(x[1],2)+pow(x[2],2))
    return float3(x[0] / mag, x[1] / mag, x[2] / mag)

def sphereCheck(rayPos, rayDir, spherePos, sphereRadius):
    hitInfo = HitInfo()

    
    offsetRayOrigin = rayPos - spherePos

    a = np.dot(rayDir, rayDir)
    b = 2 * np.dot(offsetRayOrigin, rayDir)
    c = np.dot(offsetRayOrigin, offsetRayOrigin)- sphereRadius * sphereRadius

    d = b*b-4*a*c
   
    if d >=0:
        dst = (-b-np.sqrt(d))/(2*a)
        if dst >= 0:
            hitInfo.distance = dst
            
            hitInfo.position = rayPos+rayDir*dst
            hitInfo.normal = normalize(hitInfo.position - spherePos)

    return hitInfo

def reflect(rayDir, normal):
    return rayDir - 2 * np.dot(rayDir, normal) * normal

def sceneTrace(rayPos, rayDir):
    hitInfo = HitInfo()

    
    h = sphereCheck(rayPos, rayDir, float3(-5,0,10), 1)
    if h.distance < hitInfo.distance:
        hitInfo = h
        hitInfo.albedo = float3(0.75,0.15,0.15)

    h = sphereCheck(rayPos, rayDir, float3(0,0,10), 1)
    if h.distance < hitInfo.distance:
        hitInfo = h
        hitInfo.albedo = float3(0.15,0.75,0.15)

    h = sphereCheck(rayPos, rayDir, float3(5,0,10), 2)
    if h.distance < hitInfo.distance:
        hitInfo = h
        hitInfo.albedo = float3(0.15,0.15,0.75)
        hitInfo.emissive = float3(1,1,1)

    h = sphereCheck(rayPos, rayDir, float3(15,15,10), 2)
    if h.distance < hitInfo.distance:
        hitInfo = h
        hitInfo.emissive = float3(1,1,1)

    return hitInfo

    
        
        

def trace():
    
    
    
    for x in range(width):
        for y in range(height):
            rayPos = float3(0,0,-5)
            target = float3(x/width*2-1,(y/height*2-1)*-1/aspectRatio,1)
            rayDir = normalize(target-rayPos)
            incomingLight = float3(0,0,0)
            colour = float3(1.0,1.0,1.0)
            for i in range(2):
        
                hitInfo = sceneTrace(rayPos, rayDir)

                if hitInfo.distance != maxRayDepth:
                
                    colour *= hitInfo.albedo
                    
                    incomingLight+=colour*hitInfo.emissive*2000
                    print(hitInfo.emissive)
                    rayDir = normalize(hitInfo.normal + RandomUnitVector())
                    
                    rayPos = hitInfo.position

                
        pixels[x,y] = transform(incomingLight)
                    
trace()
im.show()
