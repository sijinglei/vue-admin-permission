<template>
  <el-dialog title="添加菜单" :visible.sync="dialogRoleVisible" width="40%">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="菜单名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="是否启用">
        <el-switch v-model="form.isActive"></el-switch>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
export default {
  props: {
    dialogRoleVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      form: {
        name: '',
        isActive: false
      }
    }
  },
  methods: {
    onSubmit() {

    },
    onCancel() {
      let form = {
        name: '',
        isActive: false
      }
      Object.assign(this.form, form)
      this.$emit('onCancel')
    }
  }
}
</script>
