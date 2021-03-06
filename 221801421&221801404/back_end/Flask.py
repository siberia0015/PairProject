import json
import pymysql
from flask import Flask, request
from flask import render_template
from flask_cors import CORS

app = Flask(__name__)
CORS(app, supports_credentials=True)

@app.route('/')
def name():
    page = request.args.get('page')
    if not page or int(page) == 0:
        page = 1
    db = Mysql()
    keyword = request.args.get('keyword')
    items = db.getItems(keyword)
    key = db.getCvpr()
    key1 = db.getEccv()
    key2 = db.getIccv()
    getChartInfo()
    pageRange = range(int(page) - 3, int(page) + 2)
    if int(page) < 4:
        pageRange = range(1, int(page) + 4)
    return render_template('articles.html', items=items, page=int(page), prange=pageRange)

@app.route('/chartInfo', methods=['GET'])
def getChartInfo():
    sql = Mysql()
    data = []
    data.append(sql.getEccv())
    data.append(sql.getIccv())
    data.append(sql.getCvpr())
    dataJson = json.dumps(data)
    return dataJson

@app.route('/search', methods=['POST'])
def getSearchResult():
    keyword = request.json.get('keyword')
    sql = Mysql()
    result = sql.getItems(keyword)
    return result


@app.route('/totalrank', methods=['GET'])
def getRank():
    sql = Mysql()
    rankJson = sql.getTotalRank()
    return rankJson


@app.route('/delete', methods=['POST'])
def deletePaper():
    paperID = request.json.get('paperID')
    sql = Mysql()
    return sql.deletePaper(paperID)


class Mysql(object):
    def __init__(self):
        try:
            self.conn = pymysql.connect(host='localhost', user='root', password='123456', database='article',
                                        charset="utf8")
            self.cursor = self.conn.cursor()  # 游标对象
            print("连接数据库成功")
        except:
            print("连接失败")

    def getItems(self, keyword=None):
        if keyword:
            sql = "select * from paper" + " where title like '%" + keyword + "%' or keyword like '%" + keyword + "%'"
        self.cursor.execute(sql)
        items = self.cursor.fetchall()
        papers = []
        for r in items:
            paper = {}
            paper['id'] = r[0]
            paper['title'] = r[1]
            paper['abstractContext'] = r[2]
            paper['typeandyear'] = r[3]
            paper['keyword'] = r[4]
            paper['releasetime'] = r[5]
            paper['link'] = r[6]

            papers.append(paper)
        items = json.dumps(papers)

        return items

    def getCvpr(self):
        global CVPR
        dataList = []
        a = "2018"
        b = "2019"
        c = "2020"
        CVPR = []
        CVPR.append(a)
        CVPR.append(b)
        CVPR.append(c)

        for index in range(len(CVPR)):
            SQL = "SELECT keyword,frequency,publishyear FROM `article`.`keywordanalysis`" \
                  " WHERE `type` LIKE '%CVPR%' AND `publishyear` LIKE '%" + CVPR[
                      index] + "%' ORDER BY `frequency` DESC LIMIT 1"
            self.cursor.execute(SQL)
            alldata = self.cursor.fetchall()
            dataList.append(alldata[0])
            continue

        papers = []
        for r in dataList:
            paper = {}
            paper['year'] = r[2]
            paper['keyword'] = r[0]
            paper['count'] = r[1]
            papers.append(paper)
            continue

        paperJson = json.dumps(papers)
        return papers

    def getEccv(self):
        global ECCV
        datalist = []
        a = "2016"
        b = "2018"
        c = "2020"
        ECCV = []
        ECCV.append(a)
        ECCV.append(b)
        ECCV.append(c)

        for index in range(len(ECCV)):
            SQL = "SELECT keyword,frequency,publishyear FROM `article`.`keywordanalysis`" \
                  " WHERE `type` LIKE '%ECCV%' AND `publishyear` LIKE '%" + ECCV[
                      index] + "%' ORDER BY `frequency` DESC LIMIT 1"
            self.cursor.execute(SQL)
            alldata = self.cursor.fetchall()
            datalist.append(alldata[0])
            continue

        papers = []
        for r in datalist:
            paper = {}
            paper['year'] = r[2]
            paper['keyword'] = r[0]
            paper['count'] = r[1]
            papers.append(paper)
            continue

        paperJSON = json.dumps(papers)
        return papers

    def getIccv(self):
        global ICCV
        datalist = []
        a = "2015"
        b = "2017"
        c = "2019"
        ICCV = []
        ICCV.append(a)
        ICCV.append(b)
        ICCV.append(c)

        for index in range(len(ICCV)):
            SQL = "SELECT keyword,frequency,publishyear FROM `article`.`keywordanalysis`" \
                  " WHERE `type` LIKE '%ICCV%' AND `publishyear` LIKE '%" + ICCV[
                      index] + "%' ORDER BY `frequency` DESC LIMIT 1"
            self.cursor.execute(SQL)
            alldata = self.cursor.fetchall()
            datalist.append(alldata[0])
            continue

        papers = []
        for r in datalist:
            paper = {}
            paper['year'] = r[2]
            paper['keyword'] = r[0]
            paper['count'] = r[1]
            papers.append(paper)
            continue

        paperJSON = json.dumps(papers)
        return papers

    def getTotalRank(self):
        datalist = []
        SQL = "SELECT keyword,frequency FROM `article`.`keywordanalysis`" \
              " WHERE `type` LIKE 'all' ORDER BY `frequency` DESC LIMIT 10"
        self.cursor.execute(SQL)
        alldata = self.cursor.fetchall()
        datalist = list(alldata)

        papers = []
        for r in alldata:
            paper = {}
            paper['keyword'] = r[0]
            paper['count'] = r[1]
            papers.append(paper)
            continue

        paperJSON = json.dumps(papers)
        return paperJSON

    def deletePaper(self, paperID):
        SQL = "DELETE FROM paper WHERE `id` = '" + paperID + "'"
        rownumber = self.cursor.execute(SQL)
        self.conn.commit()
        result = {}
        results = []
        if rownumber:
            result['state'] = "1"
        else:
            result['state'] = "0"

        results.append(result)
        resJSON = json.dumps(results)
        return resJSON


if __name__ == '__main__':
    app.run(app.run(debug=True))
