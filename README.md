## MUST CREATE CHROME.EXE TO DISABLE SECURITY BEFORE RUNNING APPLICATION 
**1) Create a new Chrome shortcut (save to desktop or anywhere easily accesible)**

**2) Right-click on shortcut, select "Shortcut" tab if not already selected**

**3) Append the following to the "Target" field**

    --disable-web-security --user-data-dir="D:/Chrome"

**4) New "Target" should look something like this:**

    "C:\Program Files\Google\Chrome\Application\chrome.exe" --disable-web-security --user-data-dir="D:/Chrome"
**5) Close all instances of chrome**

**6) Open new Chrome shortcut to load application**

## Wishlist/Acknowledged Flaws: 
    -organize variables
    -make mobile friendly (map specifically) 
    -font is bad
    -change map style
    -replace scss default theme
    -give labels to form controls
    -zoom out?
    -change color of radius
    -make global styles
    -make github private (API key public is not a production solution)
    -make function of geolocation service call
    -add window for markers
    -clean up nearby search call
    -reverse geocode lat and lng to readble address
    -create reducer for form values
    -pagination for results