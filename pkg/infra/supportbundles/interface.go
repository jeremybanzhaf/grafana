package supportbundles

import "context"

type SupportItem struct {
	Filename  string
	FileBytes []byte
}

type CollectorFunc func(context.Context) (map[string]interface{}, error)
type Service interface {
	CreateSupportBundle(context.Context) (string, error)
	ListSupportBundles() ([]string, error)
	RetrieveSupportBundlePath(string) string
	RegisterSupportItemCollector(CollectorFunc)
}