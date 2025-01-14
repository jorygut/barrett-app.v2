# Barrett App

## Overview
The Barrett App is a series of tools designed to aid researchers in the Young Lab in their analysis of c-elegan movement and behavioral patterns. Each tool can be accessed through the navigation bar in the top right of the page.

## Features
### Trackmate Analyzer
The TrackMate Analyzer is designed to take an input file(in .xml format) and detect feed lawns using a grayscale and Hough algorithm, calculate the speed of each worm at each frame, calculate the time in seconds, and calculate the change in speed during before, and after a shock. It can be used by inputting an xml file outputted by TrackMate, a jpg of any frame of the video recording the worms, and the number of lawns in the video. From here, a csv titled "results.csv" should be downloaded to your computer within a few minutes.

### Regression Analysis
The Regression Analysis page can be used for identifying the relationship between variables outputted from the TrackMate Analyzer file. It works by taking a csv input and creating a new csv containing the worm number, strain, average speed, whether or not it leaves the feed lawn, and total distance travelled. From here it will use an OLS regression model to analyze the relationship between the inputted x and y variables. The output will look like a .txt file containing a detailed regression report showing the R-squared, Adj. R-squared, F-statistic, Prob (F-statistic), Log-Likelihood, AIC, BIC, Coefficents, Standard Error, T-Values, and P-Values. It can be used by inputting each csv file outputted by the TrackMate Analyzer that you would like to regress, the y-variable that you would like to predict, and the x variables that you would like to test. After hitting "Create", a .txt file should be downloaded to your computer shortly.

### Graph Creator
The Graph Creator page is designed to take an X and Y cordinate as input, alongside as many csv files as you want from the TrackMate Analyzer page. The page will output a .png containing an error bar graph for the chosen variables, using the standard deviation of the Y variable as the error.

### Track Predictor
The Track Predictor page creates uses machine learning to attempt to predict the tracks of each worm based on previous assays. By training on a dataset of assays, it is able use Linear Regression to attempt to predict what the next x and y cordinates will be at each set of cordinates. From here, it will download a graph comparing the actual tracks of the worms to the tracks predicted by the model. This can be used to gain insight into possible trends or common behaviors pathes of the worms. The features used in the model are the cordinates of all worms except for the one the model is attempting to predict, the the speed changes of the worms, and whether or not the worms have left the lawn.

### Pattern Analyzer
The Pattern Analyzer tool can be used to derive major data points from any number of CSV files analyzed using the TrackMate analyzer. These data points include the strain, number of appearances of that strain, average speed of that strain, percentage of observations that leave the lawn, average speed change before and after a shock, and the total distance travelled by all observations. This data will be displayed on a table and used for any form of statistical analysis.
