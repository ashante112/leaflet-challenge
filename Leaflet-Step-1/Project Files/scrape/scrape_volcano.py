from splinter import Browser

from bs4 import BeautifulSoup as bs
import time

from webdriver_manager.chrome import ChromeDriverManager
import pandas as pd


def init_browser():

    executable_path = {"executable_path": ChromeDriverManager().install()}
    return Browser("chrome", **executable_path, headless=False)


def scrape_info():

    browser = init_browser()

    url = "http://volcano.oregonstate.edu/deadliest-eruption"

    browser.visit(url)

    time.sleep(1)

    # Scrape page into Soup

    html = browser.html

    soup = bs(html, "html.parser")

    # Get the text

    slide_elem = soup.find("div", class_="node clear-block")

    # slide_elem.get_text()
    s = ""

    paragraphText = slide_elem.find_all("p")

    for aString in paragraphText:

        s = s + str(aString.string)

    def get_data():

         df = pd.read_html('http://volcano.oregonstate.edu/deadliest-eruption')[0]

         df.columns = ['deaths', 'volcano', 'when', 'cause']

         df.set_index('deaths', inplace=True)

         return df.to_html(classes="table table-striped")

    # Store data in a dictionary

    volcano_data = {
        "news_title": s,
        "volcano_facts":get_data()

    }

    # Close the browser after scraping

    browser.quit()

    # Return results
    return volcano_data
