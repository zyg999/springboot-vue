<template>
  <div>
    <el-table
        :data="tableData"
        border
        style="width: 100%">
      <el-table-column
          fixed
          prop="bookId"
          label="图书ID"
          width="250">
      </el-table-column>
      <el-table-column
          prop="bookTitle"
          label="图书名称"
          width="250">
      </el-table-column>
      <el-table-column
          prop="bookAuthor"
          label="图书作者"
          width="250">
      </el-table-column>
      <el-table-column
          prop="bookPrice"
          label="图书价格"
          width="250">
      </el-table-column>

      <el-table-column
          label="操作"
          width="250">
        <template slot-scope="scope">
          <el-button @click="edit(scope.row)" type="text" size="small">修改</el-button>
          <el-button @click="deleteBook(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination class="pagination"
        background
        layout="prev, pager, next" :page-size="4"
        :total="total" @current-change="pageChange">
    </el-pagination>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'pageOne',
  methods: {
    edit(row) {
      this.$router.push({
        path: '/BookUpdate',
        query: {
          bookId: row.bookId
        }
      })

    },
    deleteBook(row) {
      axios.delete("http://localhost:8081/books/deleteById/" + row.bookId).then(() => {
        this.$alert('《' + row.bookTitle + '》' + '删除成功', '消息', {
          confirmButtonText: '确定',
          callback: () => {
            window.location.reload()
          }
        });
      })
    },
    pageChange(currentPage) {
      const _this = this
      axios.get('http://localhost:8081/books/queryByPage/' + currentPage +'/4').then(function (res) {
        _this.tableData = res.data
      })
    }
  },

  created() {
    const _this = this
    axios.get('http://localhost:8081/books/queryByPage/1/4').then(function (res) {
      console.log(res);
      _this.tableData = res.data
    })
    axios.get('http://localhost:8081/books/queryAll').then(function (res) {
      console.log(res);
      _this.total = res.data.length
    })
  },

  data() {
    return {
      total: null,
      tableData: [{
        bookId: 1,
        bookTitle: '疯狂java讲义',
        bookAuthor: '李刚',
        bookPrice: 138.00
      }]
    }
  }
}
</script>
<style scoped>
  .pagination {
    text-align: center;
    margin-top: 20px;
  }
</style>

