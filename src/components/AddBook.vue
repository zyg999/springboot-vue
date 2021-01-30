<template>
  <div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="图书名称" prop="bookTitle">
        <el-input v-model="ruleForm.bookTitle"></el-input>
      </el-form-item>
      <el-form-item label="图书作者" prop="bookAuthor">
        <el-input v-model="ruleForm.bookAuthor"></el-input>
      </el-form-item>
      <el-form-item label="图书价格" prop="bookPrice">
        <el-input v-model="ruleForm.bookPrice"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios'
export default {

  name: "AddBook",
  data() {
    return {
      ruleForm: {
        bookTitle: '',
        bookAuthor: '',
        bookPrice: ''
      },
      rules: {
        bookTitle: [
          { required: true, message: '图书名不能为空', trigger: 'blur' },

        ],
        bookAuthor: [
          { required: true, message: '图书作者不能为空', trigger: 'change' }
        ],
        bookPrice: [
          {required: true, message: '图书价格不能为空', trigger: 'change' }
        ],

      }
    };
  },
  methods: {
    submitForm(formName) {
      // const _this = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios.post("http://localhost:8081/books/saveBook", this.ruleForm).then(res => {
            if (res.data === 'success') {

              this.$alert('《' + this.ruleForm.bookTitle + '》' + '添加成功', '消息', {
                confirmButtonText: '确定',
                callback: () => {
                  this.$router.push("/BookManage")
                }
              });
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      console.log('aaa');
      this.$refs[formName].resetFields();
    }
  }

}
</script>

<style scoped>

</style>