import LabelWithData from '../../components/Atoms/LabelWithData'
import Icon from '../../components/Atoms/Icon'

export default {
  title: 'Atoms/LabelWithData',
  component: LabelWithData,
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { LabelWithData, Icon },
  template: `
    <div class="max-w-sm">
      <label-with-data v-bind="$props">
        <template v-slot:label>${args.label}</template>
        <template v-slot:data>${args.data}</template>
      </label-with-data>
    </div>`,
})

export const WithSimpleText = Template.bind({})
WithSimpleText.args = {
  label: 'Billing period',
  data: `<p class="text-current font-semibold">Annual</p>`,
}

export const WithCustomHtml = Template.bind({})
WithCustomHtml.args = {
  label: 'Billing contact',
  data: `
    <div class="flex items-center justify-start text-current">
      <div class="inline-flex mr-4">
        <div class="rounded-full w-14 h-14 flex items-center justify-center bg-dark-indigo dark:bg-light-indigo bg-opacity-25 dark:bg-opacity-25">
            <icon icon-name="userRound" view-box="0 0 20 21" class="w-8 h-8 text-dark-indigo dark:text-light-indigo">
        </div>
      </div>
      <div>
          <p class="font-semibold">Dario Regazzoni</p>
          <p class="font-semibold">dario.regazzoni@outlook.fr</p>
       </div>
    </div>
`,
}
