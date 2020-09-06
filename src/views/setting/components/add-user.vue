<template>
  <el-dialog title="添加人员" :visible.sync="dialogUserVisible" width="40%">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="所属角色">
        <el-select v-model="value1" multiple placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用户姓名">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="登录密码">
        <el-input v-model="form.password"></el-input>
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
    dialogUserVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      form: {
        roles: [],
        name: "",
        password: "",
        isActive: false
      },
      options: [
        {
          value: "0",
          label: "系统管理员"
        },
        {
          value: "1",
          label: "内容管理员"
        },
        {
          value: "2",
          label: "运营管理员"
        },
        {
          value: "3",
          label: "一般用户"
        },
        {
          value: "4",
          label: "测试"
        }
      ],
      value1: []
    };
  },
  methods: {
    onSubmit() {},
    onCancel() {
      let form = {
        name: "",
        isActive: false
      };
      Object.assign(this.form, form);
      this.$emit("onCancel");
    }
  }
};
</script>
