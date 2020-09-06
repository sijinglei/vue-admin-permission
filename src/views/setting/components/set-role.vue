<template>
  <el-dialog title="分配权限" :visible.sync="dialogRoleVisible" width="40%">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item>
        <el-tree
          :data="data"
          show-checkbox
          default-expand-all
          node-key="id"
          ref="tree"
          highlight-current
          :props="defaultProps"
        >
        </el-tree>
      </el-form-item>
      <el-form-item align="right">
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button type="warning" @click="resetCheck">清空</el-button>
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
        name: "",
        isActive: false
      },
      data: [
        {
          id: 1,
          label: "系统设置",
          children: [
            {
              id: 4,
              label: "角色",
              children: [
                {
                  id: 9,
                  label: "添加角色"
                },
                {
                  id: 10,
                  label: "删除角色"
                }
              ]
            }
          ]
        },
        {
          id: 2,
          label: "菜单管理",
          children: [
            {
              id: 5,
              label: "添加菜单"
            },
            {
              id: 6,
              label: "删除菜单"
            }
          ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      }
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
    },
    resetCheck() {
      this.$refs.tree.setCheckedKeys([]);
    }
  }
};
</script>
