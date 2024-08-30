import { ShareAltOutlined } from "@ant-design/icons"
import { useIntl } from "@umijs/max"
import { Button, Flex, message } from "antd"
import { domToBlob } from "modern-screenshot"

const ShareTool = (e: { pagBodyRef: React.RefObject<HTMLDivElement> }) => {
  const { pagBodyRef } = e
  const intl = useIntl()
  const copy = intl.formatMessage({ id: "copy" })
  const share = intl.formatMessage({ id: "share" })
  const [messageApi, contextHolder] = message.useMessage()
  const generateImage = async () => {
    const dom = pagBodyRef.current
    domToBlob(dom).then((blob) => {
      const data = [new ClipboardItem({ [blob.type]: blob })]
      navigator.clipboard.write(data).then(() => {
        messageApi.open({
          type: "success",
          content: copy,
          duration: 0,
        })
        setTimeout(messageApi.destroy, 3000)
      })
    })
  }

  return (
    <>
      {contextHolder}
      <Flex gap="small" align="flex-start" vertical>
        <Flex gap="small" wrap>
          <Button
            type="primary"
            icon={<ShareAltOutlined />}
            size={"small"}
            onClick={() => generateImage()}
          >
            {share}
          </Button>
        </Flex>
      </Flex>
    </>
  )
}

export default ShareTool
