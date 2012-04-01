#!/usr/bin/env python
#
# Appcelerator Titanium Module Packager
#
#
import os, sys, glob, string
import zipfile
from datetime import date

cwd = os.path.abspath(os.path.dirname(sys._getframe(0).f_code.co_filename))
os.chdir(cwd)

ignoreFilesDocs = ['.DS_Store','.gitignore','README']

def generate_doc():
	docdir = os.path.join(cwd,'documentation_source')
	if not os.path.exists(docdir):
		print "Couldn't find documentation file at: %s" % docdir
		return None
	#sdk = config['TITANIUM_SDK']
	#support_dir = os.path.join(sdk,'module','support')
	#sys.path.append(support_dir)
	import markdown
	documentation = []
	doc_template = open(os.path.join(cwd,'doc_template.html')).read();
	doc_template_left, delim, doc_template_right = doc_template.partition('{CONTENT}');
	
	for file in os.listdir(docdir):
		if file in ignoreFilesDocs: continue
		print file
		md = open(os.path.join(docdir,file)).read()
		markd = markdown.Markdown(
				extensions=['toc']
		)
		html = markd.convert(md)
		
		new_html = doc_template_left + html + doc_template_right;

		#html = markdown2.markdown(md)
		documentation.append({file:new_html});
		print "good"
	return documentation

if __name__ == '__main__':
	docs = generate_doc()
	if docs!=None:
		for doc in docs:
			for file, html in doc.iteritems():
				filename = string.replace(file,'.md','.html')
				f = open('./documentation/%s'%(filename), 'w')
				f.write(html)
				f.close();
	sys.exit(0)

